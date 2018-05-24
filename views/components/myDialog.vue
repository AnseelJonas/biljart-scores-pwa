<template>
  <v-dialog v-model="show" persistent>
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>

      <v-card-text>{{text}}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <router-link v-bind:to="{name: route}">
          <v-btn flat>Ga terug naar overzicht</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  props: ['show', 'title', 'text', 'route'],
}
</script>

<style scoped>
</style>