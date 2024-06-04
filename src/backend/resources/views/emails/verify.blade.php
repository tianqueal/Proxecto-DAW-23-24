<x-layout>
    <x-slot name="title">
        {{ $subject }} | {{ $app }}
    </x-slot>
    <x-slot name="appName">
        {{ $app }}
    </x-slot>
    <!-- Email Body -->
    <tr>
        <td class="body" width="100%" cellpadding="0" cellspacing="0">
            <table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                <!-- Body content -->
                <tr>
                    <td class="content-cell">
                        <h1>{{ $header }}</h1>
                        <p>{{ $intro }}</p>
                        <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0"
                            role="presentation">
                            <tr>
                                <td align="center">
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                        role="presentation">
                                        <tr>
                                            <td align="center">
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    role="presentation">
                                                    <tr>
                                                        <td>
                                                            <a href="{{ $url }}" class="button button-primary"
                                                                target="_blank" rel="noopener">{{ $button }}</a>

                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <p>{{ $footer }}</p>
                        <p>{{ $salutation }},<br>{{ $signature }}</p>
                        <table class="subcopy" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td>
                                    <p>{{ $outro }}
                                        <span class="break-all"><a
                                                href="{{ $url }}">{{ $url }}</a></span>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <x-slot name="footer">
        <p>{{ date('Y') }} | {{ $app }} | MIT Licence</p>
    </x-slot>
</x-layout>
