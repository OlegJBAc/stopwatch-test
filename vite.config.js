import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from "vite-svg-loader"
import { resolve } from 'path'

export default defineConfig({
  resolve:{
    alias:{
      '@' : resolve('/src')
    },
  },
  plugins: [vue(), svgLoader()],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/main.scss";`,
      }
    }
  }
})
