import clubAddEdit from '../../../views/pages/clubAddEdit.vue';
import clubList from '../../../views/pages/clubList.vue';

import matchAdd from '../../../views/pages/matchAdd.vue';
import matchList from '../../../views/pages/matchList.vue';
import matchPlay from '../../../views/pages/matchPlay.vue';
import matchResultDetails from '../../../views/pages/matchResultDetails.vue';

import playerAddEdit from '../../../views/pages/playerAddEdit.vue';
import playerList from '../../../views/pages/playerList.vue';

export default [
    { path: '/',                name: 'Home',           component: matchList },
    { path: '/clubs',           name: 'Clubs',          component: clubList },
    { path: '/club/:id?',       name: 'ClubAddEdit',    component: clubAddEdit },
    { path: '/matches',         name: 'Matches',        component: matchList },
    { path: '/match/:id',       name: 'MatchDetails',   component: matchResultDetails,  props:true},
    { path: '/match/add',       name: 'MatchAdd',       component: matchAdd },
    { path: '/match/:id1/:id2', name: 'PlayMatch',      component: matchPlay },
    { path: '/players',         name: 'Players',        component: playerList },
    { path: '/player/:id?',     name: 'PlayerAddEdit',  component: playerAddEdit },
    { path: '*',                redirect: '/' }         //default route
];