import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                games: resolve(__dirname, 'view/Link/games.html'),
                notepad: resolve(__dirname, 'view/Notepad/note.html'),
                varfig: resolve(__dirname, 'view/Varfig/varfig.html'),
                bo: resolve(__dirname, 'view/Games/BO/bo.html'),
                ko: resolve(__dirname, 'view/Games/KO/ko.html'),
                pt: resolve(__dirname, 'view/Games/PT/pt.html'),
                rpc: resolve(__dirname, 'view/Games/RPC/rpc.html'),
                wm: resolve(__dirname, 'view/Games/WM/wm.html'),
                gr: resolve(__dirname, 'view/Xantil/GR/gr.html'),
            }
        }
    },
    server: {
        // Ensures routes work in development
        historyApiFallback: true
    }
})