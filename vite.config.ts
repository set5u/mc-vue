import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({ tsconfigPath: resolve(__dirname, 'tsconfig.app.json'), rollupTypes: true }),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url))
    }
  },
  build: {
    lib: {
      // 複数のエントリーポイントのディクショナリや配列にもできます
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es', 'cjs'],
      name: 'MCVue',
      // 適切な拡張子が追加されます
      fileName: 'mc-vue'
    },
    rollupOptions: {
      // ライブラリーにバンドルされるべきではない依存関係を
      // 外部化するようにします
      external: ['vue'],
      output: {
        // 外部化された依存関係のために UMD のビルドで使用する
        // グローバル変数を提供します
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  define: {
    __VUE_OPTIONS_API__: false
  }
})
