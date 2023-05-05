/// <reference types="astro/client-image" />
interface ImportMetaEnv {
	readonly PUBLIC_SOCKET_SERVER_URL: string | null | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
