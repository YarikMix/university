import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({mode}) => {
    process.env = loadEnv(mode, process.cwd());

    return defineConfig({
        server: {
            host: true,
            port: 3000,
            proxy: {
                "/api": process.env.VITE_API_URL,
            },
        },
        plugins: [
            react()
        ]
    })
}
