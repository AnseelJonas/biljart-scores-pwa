<template>

  <v-layout column v-if="match">

    <h1 class="title">Huidige match</h1>

    <matchDetails v-bind:match="match"></matchDetails>

    <v-container class="addPoints">
      <v-layout row v-bind:class="[ match.isCurrentPlayer1 ? 'justify-start' : 'justify-end' ]">
        <v-form ref="form" v-model="valid">
          <v-text-field ref="focus" v-model="newPoints" label="Punten" v-bind:rules="newPointsRules" 
                        type="number" required autofocus v-on:keyup.enter.native="addPoints()" ></v-text-field>
          
          <v-btn v-on:disabled="!valid" v-on:click="addPoints()"><span>Punten</span> toevoegen</v-btn>
        </v-form>
      </v-layout>
    </v-container>

    <myDialog v-bind:show="dialog" route='Matches' title="Match beëindigd."
              v-bind:text="match.getCurrentPlayer().player.name + ' is gewonnen!'"></myDialog>

  </v-layout>

</template>

<script>
import {newIDPromise, getPlayerPromise} from '../../assets/js/source/players.js';
import {Match, setMatchPromise} from '../../assets/js/source/matches.js';
import playerInMatchCard from '../components/playerInMatchCard.vue';
import myDialog from '../components/myDialog.vue';
import matchDetails from '../components/matchDetails.vue';

const POINTS_REQUIRED = "Punten moeten ingevuld worden.";
const ONLY_NUMBERS = "Dit veld mag enkel getallen bevatten.";

export default {
  data:function(){
    return {
      match: null,
      valid: false,
      newPoints: 0,
      newPointsRules: [ 
        v => !!v || POINTS_REQUIRED,
        v => !isNaN(v) || ONLY_NUMBERS,
      ],
      dialog: false,
    }
  },
  created:function(){ 
    Promise.all([
      newIDPromise(),
      getPlayerPromise(this.$route.params.id1), 
      getPlayerPromise(this.$route.params.id2)
    ])
    .then(args => new Match(args[0], args[1], args[2]))
    .then(match => this.match = match);
  },
  methods:{
    finish: function(){
      setMatchPromise(this.match);
      this.dialog = true;
    },
    addPoints(){
      if(this.valid){
        const won = this.match.addMove(parseInt(this.newPoints));
        if(won){
          this.finish();
        }
        this.$refs.form.reset();
        this.$refs.focus.focus();
      }
    },
  },
  components:{
    myDialog,
    matchDetails,
  }
}
</script>

<style scoped>
.addPoints{
  padding: 0;
}

.addPoints form{
  min-width:100px;
  max-width:45%;
}

@media screen and (max-width: 500px) {
  .addPoints span{
    display: none;
  }
}
</style>