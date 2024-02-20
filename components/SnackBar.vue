<template>
  <div class="snack-container">
    <v-slide-y-transition group>
      <v-alert
        v-for="msg in snackbar.messages"
        :key="msg.id.toString()"
        :type="msg.type"
        :text="msg.message"
        :icon="msg.icon"
        variant="tonal"
        closable
        @click:close="snackbar.hide(msg.id)"
      />
    </v-slide-y-transition>
  </div>
</template>

<script setup lang="ts">
const snackbar = useSnackBarStore();
</script>

<style scoped>
.snack-container {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50%;
}
</style>
