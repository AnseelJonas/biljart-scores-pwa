<template>

  <v-layout column>

    <h1 class="title">{{title}}</h1>

    <v-form v-model="valid" ref="form">
      <v-text-field v-model="club.name"           label="Naam"            v-bind:rules="nameRules"      required></v-text-field>
      <v-text-field v-model="club.location"       label="Locatie"                                       ></v-text-field>
      <v-text-field v-model="club.contactPerson"  label="Contactpersoon"                                ></v-text-field>
      
      <v-btn v-on:disabled="!valid" v-on:click="save()">Opslaan</v-btn>
    </v-form>

  </v-layout>

</template>

<script>
import * as c from '../../assets/js/source/clubs.js';

const EDIT_CLUB = "Club aanpassen";
const NEW_CLUB = "Nieuwe club";
const NAME_REQUIRED = "Naam is verplicht."

export default {
  data:function(){
    return {
      club: {},
      title: '',
      valid: false,
      nameRules: [ v => !!v || NAME_REQUIRED],
    }
  },
  created:function(){ 
    if(this.$route.params.id != null){
      this.title = EDIT_CLUB;
      c.getClubPromise(this.$route.params.id)
      .then(club => this.club = club);
    }else{
      this.title = NEW_CLUB;
      c.newIDPromise()
      .then(newID => this.club = new c.Club(newID,'', '', ''));
    }
  },
  methods:{
    save: function(){
      this.$refs.form.validate();

      if (this.valid){
        c.setClubPromise(this.club);
        this.$router.push({ name: 'Clubs'});
      }
    }
  }
}
</script>

<style scoped>

</style>