<template>
<div>
  <table border v-if="started">
    <tr>
      <td v-for="(k,i) in board" @click="move(i)" :class="species(k)" style="text-align:center">
	{{character(k)}}	
      </td>	
    </tr>
  </table>
  <b-button @click="start" v-if="!started">
    start
  </b-button>
  {{games}}
</div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import { mapGetters } from 'vuex'
const db = firebase.firestore()

export default{
    props:['M','N','L'],//プロパティ：ボードの性質を定める
    data(){
	return {
	    board:null,
	    started:false,
	    teban:1,
	}
    },
    created(){//dbcollectionとgemeを結びつける
	this.$store.dispatch('setGamesRef', db.collection('games'))//setGamesRefを呼び出し、gemesを
    },
    computed: {
	    ...mapGetters({games: 'games' })
    },
    methods:{
	move(i){//i番目のセルが押された時
	    if(this.board[i]!=this.teban){//手番が違うコマを動かそうとしたら何もしない
		return;
	    }
	    let tmp=this.board[i]//保存
	    
	    if(i+1<this.board.length && this.board[i]==1 && this.board[i+1]=="_"){
		this.board.splice(i,1,this.board[i+1])//右に行く
		this.board.splice(i+1,1,tmp)
	    }
	    else if(i+2<this.board.length && this.board[i]==1 && this.board[i+2]=="_" && this.board[i+1]==2){
		this.board.splice(i,1,this.board[i+2])//右に行く
		this.board.splice(i+2,1,tmp)
	    }
	    
	    else if(i>0 &&  this.board[i]==2  && this.board[i-1]=="_"){
		this.board.splice(i,1,this.board[i-1])//左に行く
		this.board.splice(i-1,1,tmp)//i-1から1個書き換える		
	    }
	    else if(i>1 && this.board[i]==2  && this.board[i-2]=="_" && this.board[i-1]==1){
		this.board.splice(i,1,this.board[i-2])//左に行く
		this.board.splice(i-2,1,tmp)//i-1から1個書き換える
	    }
	    else {
		return;
	    }
	    if(this.teban==1){
		this.teban=2;
	    }
	    else if(this.teban==2){
		this.teban=1;
	    }
	},
	species(k){//kは1,2,"_"
	    if(k==1){
		return "toad";
	    }
	    else if(k==2){
		return "frog";
	    }
	    else return "_";
	},
	character(k){
	    if(k==1){
		return "T";
	    }
	    else if(k==2){
		return "F";
	    }
	    else return " ";
	    },
	start(){
	    this.board=[]
	    for(let i=0;i<this.M;i++){
		this.board.push("1")//1番目：toad
	    }
	    for(let i=0;i<this.L-this.M-this.N;i++){
		this.board.push("_")//空っぽ
	    }
	    for(let i=0;i<this.N;i++){
		this.board.push("2")//2番目：frogs
	    }
	    this.started=true
	}
    }
}
</script>
