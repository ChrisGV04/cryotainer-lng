import Vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import generateSitemap from 'vite-ssg-sitemap';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue(),
    Pages(),
    Layouts(),
    Inspect(),

    AutoImport({
      vueTemplate: true,
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
    }),

    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [IconsResolver({ prefix: '' }), HeadlessUiResolver({ prefix: 'Hui' })],
    }),

    Icons({ compiler: 'vue3', autoInstall: true }),
  ],

  server: {
    port: 8085,
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap();
    },
  },
});
