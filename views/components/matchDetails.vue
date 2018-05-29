<template>

  <v-layout column v-if="match">

    <v-container>
      <v-layout row>
        <playerInMatchCard v-bind:playerInMatch="match.playerInMatch1"></playerInMatchCard>
        <playerInMatchCard v-bind:playerInMatch="match.playerInMatch2"></playerInMatchCard>
      </v-layout>
    </v-container>

    <table>
      <tr>
        <td>{{match.playerInMatch1.getNumberOfMoves()}}</td>
        <td><v-chip label>Beurten</v-chip></td>
        <td>{{match.playerInMatch2.getNumberOfMoves()}}</td>
      </tr>
      <tr>
        <td>{{match.playerInMatch1.getHighestPoint()}}</td>
        <td><v-chip label>Hoogste</v-chip></td>
        <td>{{match.playerInMatch2.getHighestPoint()}}</td>
      </tr>
      <tr>
        <td>{{match.playerInMatch1.getAverage()}}</td>
        <td><v-chip label>Gemiddelde</v-chip></td>
        <td>{{match.playerInMatch2.getAverage()}}</td>
      </tr>
      <tr>
        <td>{{match.playerInMatch1.getLastPoints(4).toString()}}</td>
        <td><v-chip label>Laatste punten</v-chip></td>
        <td>{{match.playerInMatch2.getLastPoints(4).toString()}}</td>
      </tr>
    </table>

  </v-layout>

</template>

<script>
import playerInMatchCard from './playerInMatchCard.vue';

export default {
  props: ['match'],
  components:{
    playerInMatchCard,
  }
}
</script>

<style scoped>
table{
  width:300px;
  max-width:100%;
  margin: 8px auto;
}

td{
  width:33;
  text-align:center;
  line-height: 200%;
}

.container{
  padding: 0;
}
</style>