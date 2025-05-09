import { defineConfig } from 'vite'
import { resolve } from 'path'
import fg from 'fast-glob' // installa con: npm i -D fast-glob

const mode = process.env.BUILD_MODE

const componentEntries = fg.sync('src/**/*.ts', {
  ignore: ['src/app/**', 'src/main.ts', 'src/index.ts'],
})

const inputEntries = Object.fromEntries(
  componentEntries.map(file => {
    const relativePath = file.replace(/^src\//, '').replace(/\.ts$/, '')
    return [relativePath, resolve(__dirname, file)]
  })
)

export default defineConfig({
  base: mode === 'app' ? '/dj-console/' : '',
  build:
    mode === 'lib'
      ? {
          rollupOptions: {
            input: inputEntries,
            output: {
              entryFileNames: '[name].js',
              dir: 'dist/lib',
            },
          },
          outDir: 'dist/lib',
          emptyOutDir: false,
          target: 'esnext',
          minify: false,
          lib: false,
        }
      : {
          outDir: 'dist/app',
          emptyOutDir: false,
        },
})
