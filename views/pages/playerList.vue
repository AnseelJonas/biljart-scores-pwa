<template>
  <v-layout column v-touch="{ 
    left: () => swipeLeft(),
    right: () => swipeRight()
  }">

    <h1 class="title">Spelers</h1>
    
    <empty v-if="!(items.length > 0)"></empty>
    
    <v-list v-else three-line v-for="item in items" v-bind:key="item.id">
      <v-list-tile avatar v-on:click="">
        <v-list-tile-avatar>
          <v-icon>account_circle</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{item.club}}</v-list-tile-sub-title>
          <v-list-tile-sub-title>Licentienummer: {{item.licenseNumber}} - Handicap: {{item.handicap}}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple v-on:click="deletePlayer(item.id.toString())">
            <v-icon color="grey lighten-1">delete</v-icon>
          </v-btn>
          <v-btn icon ripple v-bind:to="{ name: 'PlayerAddEdit', params: {id: item.id.toString()}}">
            <v-icon color="grey lighten-1">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
    </v-list>

    <router-link v-bind:to="{name: 'PlayerAddEdit'}">
      <v-btn fab bottom right dark color="pink" fixed>
          <v-icon>add</v-icon>
      </v-btn>
    </router-link>

  </v-layout>
</template>

<script>
  import {getPlayersPromise, removePlayerPromise} from '../../assets/js/source/players.js';
  import empty from '../components/empty.vue';

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
      deletePlayer(id){
        removePlayerPromise(id);
        this.reload();
      },
      reload(){
        getPlayersPromise()
        .then(players => this.items = players);
      },
      swipeLeft(){
        this.$router.push({name: 'Clubs'});
      },
      swipeRight(){
        this.$router.push({name: 'Matches'});
      }
    },
    components:{
      empty
    }
  }
</script>

<style scoped>

</style>