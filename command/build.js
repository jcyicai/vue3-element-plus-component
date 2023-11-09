import path from 'path'
import { defineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __dirname = path.resolve()
// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')
// 出口文件夹
const outputDir = path.resolve(__dirname, '../lib')

// vite 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

//全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, 'index.ts'),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
}

// 打包成库
const buildLib = async () => {
  await buildAll()
}

buildLib()
