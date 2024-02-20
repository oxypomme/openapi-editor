<template>
  <v-app>
    <MainMenu v-model="drawer" />

    <v-app-bar elevation="0" style="border-bottom-width: thin;">
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>
        {{ swaggerStore.api.info?.name || 'OpenAPI Editor' }}

        <template v-if="swaggerStore.api.info">
          <v-chip variant="outlined" size="small" color="primary" prepend-icon="mdi-api" class="ml-2">
            v{{ swaggerStore.api.info.version }}
          </v-chip>

          <v-chip variant="outlined" size="small" color="green" class="ml-2">
            v{{ swaggerStore.api.info.oas }}
          </v-chip>
        </template>

      </v-app-bar-title>

      <v-spacer />

      <v-btn variant="text" icon="mdi-cog-outline" href="/settings" />

      <v-btn :icon="themeIcon" variant="text" @click="toggleTheme()" />
    </v-app-bar>

    <v-divider />

    <v-main>
      <slot />
    </v-main>

    <SnackBar />
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';

const theme = useTheme();
const swaggerStore = useSwaggerStore();

const drawer = ref<boolean>(true);

const themeIcon = computed(() => (theme.current.value.dark ? 'mdi-brightness-4' : 'mdi-brightness-6'));

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>
