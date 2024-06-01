import AtSymbol from '../../assets/heroicons/AtSymbol'

export default function Footer() {
  return (
    <footer className="bg-black py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Información de la Empresa */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">MasterNote</h2>
            <p className="mt-2 max-w-xs text-sm text-gray-400">
              Proyecto web para la organización de notas y tareas personales.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">Enlaces Rápidos</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Comunidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cliente Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Mis Notas
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="text-xl font-bold">Contacto</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-1">
                <AtSymbol className="size-4" />
                <a
                  href="mailto:masternote@alwaysdata.net"
                  className="hover:underline"
                >
                  masternote@alwaysdata.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Licencia */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>{new Date().getFullYear()} | MasterNote | MIT License</p>
        </div>
      </div>
    </footer>
  )
}
