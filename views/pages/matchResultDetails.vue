<template>

  <v-layout column v-if="match">
    
    <v-layout row>    
      <router-link v-bind:to="{name: 'Matches'}">
        <v-icon class="back">arrow_back</v-icon>
      </router-link>
      <h1 class="title">Match details</h1>
    </v-layout>

    <matchDetails v-bind:match="match"></matchDetails>

  </v-layout>

</template>

<script>
import {getMatchPromise, Match, PlayerInMatch} from '../../assets/js/source/matches.js';
import playerInMatchCard from '../components/playerInMatchCard.vue';
import matchDetails from '../components/matchDetails.vue';

export default {
  props: ['id'],
  data: function(){
    return{
      match: null
    }
  },
  created: function(){
    getMatchPromise(this.id)
    .then(res => {
      res = Object.assign(new Match, res);
      res.playerInMatch1 = Object.assign(new PlayerInMatch, res.playerInMatch1);
      res.playerInMatch2 = Object.assign(new PlayerInMatch, res.playerInMatch2);
      return res;
    })
    .then(res => this.match = res);
  },
  components:{
    playerInMatchCard,
    matchDetails,
  }
}
</script>

<style scoped>
.back{
  padding: 15px;
}
</style>