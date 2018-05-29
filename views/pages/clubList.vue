<template>
  <v-layout column v-touch="{ right: () => swipeRight() }">

    <h1 class="title">Clubs</h1>
    
    <empty v-if="!(items.length > 0)"></empty>

    <v-list v-else three-line v-for="item in items" v-bind:key="item.id">
      <v-list-tile avatar v-on:click="">
        <v-list-tile-avatar>
          <v-icon>supervised_user_circle</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
          <v-list-tile-sub-title>Locatie: {{item.location}}</v-list-tile-sub-title>
          <v-list-tile-sub-title>Contactpersoon: {{item.contactPerson}}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple v-on:click="deleteClub(item.id.toString())">
            <v-icon color="grey lighten-1">delete</v-icon>
          </v-btn>
          <v-btn icon ripple v-bind:to="{ name: 'ClubAddEdit', params: {id: item.id.toString()}}">
            <v-icon color="grey lighten-1">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
    </v-list>

    <router-link v-bind:to="{name: 'ClubAddEdit'}">
      <v-btn fab bottom right dark color="pink" fixed>
          <v-icon>add</v-icon>
      </v-btn>
    </router-link>

  </v-layout>
</template>

<script>
  import {getClubsPromise, removeClubPromise} from '../../assets/js/source/clubs.js';
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
      deleteClub(id){
        removeClubPromise(id);
        this.reload();
      },
      reload(){
        getClubsPromise()
        .then(clubs => this.items = clubs);
      },
      swipeRight(){
        this.$router.push({name: 'Players'});
      }
    },
    components:{
      empty
    }
  }
</script>

<style scoped>

</style>