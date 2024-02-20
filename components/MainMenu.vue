<template>
  <v-navigation-drawer
    :model-value="modelValue"
    width="400"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-list-item class="py-2">
      <v-list-item-title>
        <v-btn variant="text" icon="mdi-plus" disabled />

        <FileLoader />
      </v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-list v-model:opened="open" :disabled="!swaggerStore.id">
      <PathMenu />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean,
}>();

defineEmits<{
  'update:modelValue': [value: boolean]
}>();

const swaggerStore = useSwaggerStore();

const open = ref<string[]>(['Paths', 'Models']);

// {
//   title: 'Models',
//   icon: 'mdi-folder-pound-outline',
//   items: [
//     { title: 'Task' },
//   ],
// },
// {
//   title: 'Requests',
//   icon: 'mdi-folder-arrow-down-outline',
//   items: [],
// },
// {
//   title: 'Responses',
//   icon: 'mdi-folder-arrow-up-outline',
//   items: [
//     { title: '200', color: 'success' },
//     { title: '404', color: 'error' },
//   ],
// },
// {
//   title: 'Parameters',
//   icon: 'mdi-folder-wrench-outline',
//   items: [
//     { title: 'count' },
//   ],
// },
// {
//   title: 'Examples',
//   icon: 'mdi-folder-file-outline',
//   items: [],
// },
</script>

<style>
.custom--file-input.v-input {
  display: inline-block;
}
.custom--file-input.v-input > .v-input__prepend {
  width: 100%;
  margin-inline-end: 0;
}
.custom--file-input.v-input > .v-input__prepend > .v-icon {
  opacity: 1;
}
.custom--file-input.v-input > .v-input__control,
.custom--file-input.v-input > .v-input__details {
  display: none;
}
</style>
