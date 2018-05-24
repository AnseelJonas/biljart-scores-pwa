<template>
  <v-card v-if="match" class="text-xs-center">
    <p>{{getDate}}</p>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
            <playerInMatchCard v-bind:playerInMatch="match.playerInMatch1"></playerInMatchCard>
        </v-flex>
        <v-flex xs6>
            <playerInMatchCard v-bind:playerInMatch="match.playerInMatch2"></playerInMatchCard>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions>
      <v-btn color="info" v-bind:to="{name: 'MatchDetails', params: { id: match.id }}">Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import playerInMatchCard from './playerInMatchCard.vue';

export default {
  props: ['match'],
  components:{
    playerInMatchCard,
  },
  computed:{
    getDate(){
      return `${this.match.date.getDate()}/${this.match.date.getMonth() + 1}/${this.match.date.getUTCFullYear()}`;
    }
  }
}
</script>

<style scoped>
.card{
  margin: 15px;
  padding: 15px;
}

.card .card{
  margin: 0;
  padding: 0;
  box-shadow: none;
}

.btn{
  margin: 0 auto;
}
</style>