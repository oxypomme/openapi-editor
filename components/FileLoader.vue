<template>
  <v-menu v-model="open" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn
        variant="text"
        icon="mdi-open-in-app"
        v-bind="props"
      />
    </template>

    <v-card width="300">
      <v-form v-model="valid" @submit.prevent="loadFile()">
        <v-card-text>
          <v-text-field
            v-model="path"
            :rules="rules"
            label="Path to the OpenAPI file"
            variant="outlined"
            hide-details="auto"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn :disabled="!valid" type="submit" color="success">Load</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const swaggerStore = useSwaggerStore();
const snackbarStore = useSnackBarStore();

const open = ref(false);
const valid = ref(false);
const path = ref('');

const rules: ((v: string) => true | string)[] = [
  (v) => !!v || 'Path is required',
  (v) => /\.(json|ya?ml)$/.test(v) || 'Path must be a JSON or YAML file',
];

watch(
  () => swaggerStore.file,
  () => { path.value = swaggerStore.file; },
);

const loadFile = async () => {
  if (!valid) {
    return;
  }

  try {
    await swaggerStore.loadFile(path.value);
    open.value = false;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    snackbarStore.show({ message, type: 'error' });
  }
};
</script>

<style scoped>

</style>
