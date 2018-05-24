<template>

  <v-card v-if="playerInMatch">
    <p class="headline">{{playerInMatch.player.name}}</p>

    <p>{{playerInMatch.player.club}}</p>
    <p class="score">{{playerInMatch.getPointsMade()}} / {{playerInMatch.getTotalPointsToMake()}}</p>

    <v-progress-linear v-bind:value="playerInMatch.getPercentageOfPointsMade()"></v-progress-linear>
  </v-card>

</template>

<script>
export default {
  props: ['playerInMatch'],
}
</script>

<style scoped>
  .card{
    margin:10px;
    padding: 10px;
    width:100%;
  }

  .score{
    font-size: 1.5rem;
  }
</style>