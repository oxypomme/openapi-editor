import { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    // 'nuxt-electron',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
  ],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },

  // electron: {
  //   build: [
  //     {
  //       // Main-Process entry file of the Electron App.
  //       entry: 'app/main.ts',
  //     },
  //   ],
  // },
});
