<template>

  <v-layout column>

    <h1 class="title">{{title}}</h1>

    <v-form v-model="valid" ref="form">
      <v-text-field v-model="player.name"          label="Naam"            v-bind:rules="nameRules"           required></v-text-field>
      <v-text-field v-model="player.licenseNumber" label="Licentienummer"  v-bind:rules="licenseNumberRules"  ></v-text-field>
      <v-select     v-model="player.club"          label="Club"            v-bind:items="clubs"               ></v-select>
      <v-text-field v-model="player.handicap"      label="Handicap"        v-bind:rules="handicapRules"       required></v-text-field>
      
      <v-btn v-on:disabled="!valid" v-on:click="save()">Opslaan</v-btn>
    </v-form>

  </v-layout>

</template>

<script>
import * as p from '../../assets/js/source/players.js';
import {getClubsPromise} from '../../assets/js/source/clubs.js';

const EDIT_PLAYER = "Speler aanpassen";
const NEW_PLAYER = "Nieuwe speler";
const NAME_REQUIRED = "Naam is verplicht.";
const HANDICAP_REQUIRED = "Handicap is verplicht.";
const ONLY_NUMBERS = "Dit veld mag enkel getallen bevatten.";

export default {
  data:function(){
    return {
      player: {},
      clubs: [],
      title: '',
      valid: false,
      nameRules: [ v => !!v || NAME_REQUIRED],
      licenseNumberRules: [ v => !isNaN(v) || ONLY_NUMBERS],
      handicapRules: [ 
        v => !!v || HANDICAP_REQUIRED,
        v => !isNaN(v) || ONLY_NUMBERS
      ]
    }
  },
  created:function(){ 
    if(this.$route.params.id != null){
      this.title = EDIT_PLAYER;
      p.getPlayerPromise(this.$route.params.id)
      .then(player => this.player = player);
    }else{
      this.title = NEW_PLAYER;
      p.newIDPromise()
      .then(newID => this.player = new p.Player(newID,'', 0, '', null));
    }

    getClubsPromise()
    .then(clubs => this.clubs = clubs.map(c => c.name));
  },
  methods:{
    save: function(){
      this.$refs.form.validate();

      if (this.valid){
        p.setPlayerPromise(this.player);
        this.$router.push({ name: 'Players'});
      }
    }
  }
}
</script>

<style scoped>

</style>