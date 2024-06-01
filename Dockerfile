# Etapa de construcción de la aplicación Laravel
FROM php:8.2-apache AS laravel

# Instalación de dependencias de PHP y Apache
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo_mysql bcmath \ 
    && a2enmod rewrite

# Instalación de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Variables de entorno
ARG MASTERNOTE_DB_HOST
ARG MASTERNOTE_DB_DATABASE
ARG MASTERNOTE_DB_USERNAME
ARG MASTERNOTE_DB_PASSWORD
ARG MASTERNOTE_MAIL_MAILER
ARG MASTERNOTE_MAIL_HOST
ARG MASTERNOTE_MAIL_PORT
ARG MASTERNOTE_MAIL_USERNAME
ARG MASTERNOTE_MAIL_PASSWORD
ARG MASTERNOTE_MAIL_FROM_ADDRESS
ARG MASTERNOTE_MAIL_FROM_NAME
ARG MASTERNOTE_CLIENT_URL

# Copiar los archivos de Laravel desde la carpeta /src/backend
WORKDIR /var/www/html
COPY src/backend/ .

# Concatenar todas las variables de entorno y escribirlas en el archivo .env
RUN cp .env.prod.example .env

RUN echo "DB_HOST=$MASTERNOTE_DB_HOST" >> .env \
    && echo "DB_DATABASE=$MASTERNOTE_DB_DATABASE" >> .env \
    && echo "DB_USERNAME=$MASTERNOTE_DB_USERNAME" >> .env \
    && echo "DB_PASSWORD=$MASTERNOTE_DB_PASSWORD" >> .env \
    && echo "MAIL_MAILER=$MASTERNOTE_MAIL_MAILER" >> .env \
    && echo "MAIL_HOST=$MASTERNOTE_MAIL_HOST" >> .env \
    && echo "MAIL_PORT=$MASTERNOTE_MAIL_PORT" >> .env \
    && echo "MAIL_USERNAME=$MASTERNOTE_MAIL_USERNAME" >> .env \
    && echo "MAIL_PASSWORD=$MASTERNOTE_MAIL_PASSWORD" >> .env \
    && echo "MAIL_FROM_ADDRESS=$MASTERNOTE_MAIL_FROM_ADDRESS" >> .env \
    && echo "MAIL_FROM_NAME=$MASTERNOTE_MAIL_FROM_NAME" >> .env \
    && echo "CLIENT_URL=$MASTERNOTE_CLIENT_URL" >> .env

# Cambiar propietario del directorio de almacenamiento
RUN chown www-data:www-data -R ./storage

# Instalación de dependencias de Laravel
RUN composer update --no-interaction --optimize-autoloader

# Generación de la clave de la aplicación y optimización de la aplicación
RUN php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan optimize

# Puerto de escucha del servidor Apache
EXPOSE 80
COPY apache2.conf /etc/apache2/sites-enabled/000-default.conf

# Etapa de construcción de la aplicación React
FROM node:20.14 AS react
WORKDIR /app
COPY src/frontend/package.json src/frontend/package-lock.json ./
RUN npm install

# Variable de entorno para React
ARG MASTERNOTE_API_URL

COPY src/frontend ./
RUN echo "VITE_API_URL=$MASTERNOTE_API_URL" > .env.local
RUN npm run build

# Combinación de las etapas de construcción de Laravel y React
FROM laravel AS app
COPY --from=react /app/dist/assets /var/www/html/public/assets
COPY --from=react /app/dist/index.html /var/www/html/resources/views/index.blade.php

CMD ["apache2-foreground"]
