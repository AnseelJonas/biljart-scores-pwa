<template>
  <v-layout column v-touch="{ left: () => swipeLeft() }">

    <h1 class="title">Matches</h1>
    
    <empty v-if="!(items.length > 0)"></empty>

    <matchResultCard v-else v-for="item in items" v-bind:key="item.id" v-bind:match="item"></matchResultCard>

    <router-link v-bind:to="{name: 'MatchAdd'}">
      <v-btn fab bottom right dark color="pink" fixed>
          <v-icon>add</v-icon>
      </v-btn>
    </router-link>

  </v-layout>
</template>

<script>
  import {getMatchesPromise, Match, PlayerInMatch} from '../../assets/js/source/matches.js';
  import empty from '../components/empty.vue';
  import matchResultCard from '../components/matchResultCard.vue';

  export default {
    data: function(){
      return {
        items: [],
      }
    },
    created:function(){
      this.reload();
    },
    methods:{
      reload(){
        getMatchesPromise()
        .then(objects => {
          this.items = objects.map(object => Object.assign(new Match, object));
          this.items.forEach(match => {
            match.playerInMatch1 = Object.assign(new PlayerInMatch, match.playerInMatch1);
            match.playerInMatch2 = Object.assign(new PlayerInMatch, match.playerInMatch2);
          });
        });
      },
      swipeLeft(){
        this.$router.push({name: 'Players'});
      }
    },
    components:{
      empty,
      matchResultCard
    }
  }
</script>

<style scoped>

</style>