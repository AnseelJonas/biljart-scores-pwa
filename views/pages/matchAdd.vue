<template>

  <v-layout column>

    <h1 class="title">Nieuwe match</h1>

    <v-form v-model="valid" ref="form">
      <v-select v-model="player1" label="Speler 1" v-bind:items="players" item-value="id" item-text="name" item-disabled="disabled1" v-bind:rules="playerRules" v-on:change="dontPlayAgainstYourself(true, $event)" required></v-select>
      <v-select v-model="player2" label="Speler 2" v-bind:items="players" item-value="id" item-text="name" item-disabled="disabled2" v-bind:rules="playerRules" v-on:change="dontPlayAgainstYourself(false, $event)" required></v-select>
      
      <v-btn v-on:disabled="!valid" v-on:click="start()">Start match</v-btn>
    </v-form>

  </v-layout>

</template>

<script>
import {getPlayersPromise} from '../../assets/js/source/players.js';

const NAME_REQUIRED = "Naam is verplicht.";

export default {
  data:function(){
    return {
      players: [],
      player1: null,
      player2: null,
      valid: false,
      playerRules: [ v => !!v || NAME_REQUIRED],
    }
  },
  created:function(){ 
    getPlayersPromise()
    .then(players => this.players = players);
  },
  methods:{
    start: function(){
      this.$refs.form.validate();

      if (this.valid){
        this.$router.push({ 
          name: 'PlayMatch', 
          params: {id1: this.player1.toString(), id2: this.player2.toString()}
        });
      }
    },
    dontPlayAgainstYourself: function(first, selectedId){
      if(first){
        this.players.forEach(player => player.disabled2 = false);
        this.players.find(player => player.id === selectedId).disabled2 = true;
      }else{
        this.players.forEach(player => player.disabled1 = false);
        this.players.find(player => player.id === selectedId).disabled1 = true;
      }
    }
  }
}
</script>

<style scoped>

</style>