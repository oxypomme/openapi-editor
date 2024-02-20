<template>
  <v-list-group value="Path">
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        prepend-icon="mdi-folder-network-outline"
        title="Path"
      >
        <template v-if="pathsCount" v-slot:append>
          <v-badge
            :content="pathsCount"
            color="primary"
            inline
          />
        </template>
      </v-list-item>
    </template>

    <template v-for="{ tag, paths } in swaggerStore.api.paths" :key="tag">
      <v-list-subheader class="text-uppercase">
        {{ tag }}

        <v-badge :content="paths.length" inline class="ml-4" />
      </v-list-subheader>

      <v-list-item
        v-for="{ method, path } in paths"
        :key="`${tag}-${method}-${path}`"
        :href="`/paths/${method}${path}`"
      >
        <v-list-item-action>
          <v-chip
            :color="METHOD_MAP[method].color"
            size="x-small"
            class="mr-2 text-uppercase"
          >
            {{ method }}
          </v-chip>
        </v-list-item-action>

        <v-list-item-title>{{ path }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-list-group>
</template>

<script setup lang="ts">
const METHOD_MAP: Record<string, { color: string }> = {
  get: { color: 'blue' },
  put: { color: 'green' },
  post: { color: 'red' },
  delete: { color: 'red' },
  options: { color: 'cyan' },
  head: { color: 'cyan' },
  patch: { color: 'yellow' },
  trace: { color: 'grey' },
};

const swaggerStore = useSwaggerStore();

const pathsCount = computed(() => {
  const apiPaths = swaggerStore.api.paths ?? [];

  return apiPaths.reduce(
    (prev, { paths }) => prev + paths.length,
    0,
  );
});
</script>

<style scoped>

</style>
