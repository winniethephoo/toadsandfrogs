<template>
<section class="section">
  <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
	<div class="tile">
	  <div class="tile is-parent is-vertical">
	    <article v-if="!started" class="tile is-child notification is-warning">
	      <ul>
		<li v-for="(g,i) in games">
		  <b-button @click="startgame(g.id)"> 
		  {{i}}:{{g.board}}:{{g.id}}
		   </b-button>
		</li>		
	      </ul>
            </article>
            <article v-if="!started"class="tile is-child notification is-primary">
	      <b-field label="number of toads">
		<b-numberinput v-model="M"></b-numberinput>
	      </b-field>
	      <b-field label="number of frogs">
		<b-numberinput v-model="N"></b-numberinput>
	      </b-field>
	      <b-field label="board length">
		<b-numberinput v-model="L"></b-numberinput>
	      </b-field>
	      <b-button v-if="!started" @click="newgame"> 
		new game
	      </b-button>
	    </article>
	  </div>
	</div>
	</div>
	<div v-if="started">
	  <gameboard M=2 N=3 L=7>
      </gameboard>
    </div>
    </div>
    
</section>
</template>

<script>
import gameboard from '~/components/gameboard'
import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
import { mapGetters } from 'vuex'

export default {
    name: 'HomePage',
    data(){
	return{started:false,M:2,N:2,L:6
	      }
    },
    created(){//dbcollectionとgemeを結びつける
	this.$store.dispatch('setGamesRef', db.collection('games'))//setGamesRefを呼び出し、gemesを
    },
    computed: {
	    ...mapGetters({games: 'games' }),
    },
    components: {
	gameboard
	
    },
    methods:{
	newgame(){
	    let ref=db.collection("games")
	    let board=[]
	    for(let i=0; i<this.M;i++){
		board.push(1)
	    }
	    for(let i=0;i<this.L-(this.M*1+this.N*1);i++){
		board.push(0)
	    }
	    for(let i=0;i<this.N;i++){
		board.push(2)		
		}
	    ref.doc().set({board:JSON.stringify(board),teban:1,numplayer:0,finished:false})
	},
	startgame(id){
	    this.started=true;
	    }
    }
    
}

</script>
