import { defineConfig } from "vite";
import htmlPurge from 'vite-plugin-purgecss';
import{ViteMinifyPlugin} from 'vite-plugin-minify'
import path, {resolve} from 'node:path';
import * as glob from 'glob';

const obtenerEntradas = ()=>{
    return Object.fromEntries(
        [
            ...glob.sync(
                './**/*.html',
                {
                    ignore: [
                        './dist/**',
                        './node_modules/**'
                    ]
                }
            ).map(
                file =>[
                file.slice(0, File.length - path.extname(file).lenght),
                resolve(__dirname, file)
                ]
            )
        ]
    )
}

export default defineConfig(
    {
        appType: 'mpa',
        build:{
            rollupOptions:{
                input:obtenerEntradas()
            },
            minify: true
        },
        plugins: [
            htmlPurge({}),
            ViteMinifyPlugin(),
        ]
    }
)