<template>
<div>
  <div v-if="teban!=null">
    {{teban==2? "F":"T"}}
    </div>
  <table border v-if="started">
    <tr>
      <td v-for="(k,i) in JSON.parse(games[0].board)" @click="move(i)" :class="species(k)" style="text-align:center">
	{{character(k)}}	
      </td>	
    </tr>
  </table>
  <b-button @click="start" v-if="!started">
    start
  </b-button>
  {{games[0]}}
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
	    teban:null,
	    //numplayer:null,
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
	    let kore=this
	    let ref = db.collection("games").doc("game")//firebabaseのcollectionの中のgamesの中のgameを呼び出す
	    ref.get().then(function(doc){//docを呼び出し　thenという関数の中のfunctionという関数を呼び出してる
		let board=JSON.parse(doc.data().board)//localにボードデータを保存
		console.log(board)
		//ゲームの中読み出して
		if(board[i]!=doc.data().teban || kore.teban!=board[i]){//手番が違うコマを動かそうとしたら何もしない
		    return;
		}
		let tmp=board[i]//保存
		if(i+1<board.length && board[i]==1 && board[i+1]==0){
		    board.splice(i,1,board[i+1])//右に行く
		    board.splice(i+1,1,tmp)
		    ref.update({board:JSON.stringify(board)})//localのなかの変数をdatabaseに入れる
		}
		else if(i+2<board.length && board[i]==1 && board[i+2]==0 && board[i+1]==2){
		    board.splice(i,1,board[i+2])//右に行く
		    board.splice(i+2,1,tmp)
		    ref.update({board:JSON.stringify(board)})
		}
		
		else if(i>0 &&  board[i]==2  && board[i-1]==0){
		    board.splice(i,1,board[i-1])//左に行く
		    board.splice(i-1,1,tmp)//i-1から1個書き換える
		    ref.update({board:JSON.stringify(board)})
		}
		else if(i>1 && board[i]==2  && board[i-2]==0 && board[i-1]==1){
		    board.splice(i,1,board[i-2])//左に行く
		    board.splice(i-2,1,tmp)//i-1から1個書き換える
		    ref.update({board:JSON.stringify(board)})
		}
		else {
		    return;
		}
		if(doc.data().teban==1){
		    ref.update({teban:2})
		}
		else if(doc.data().teban==2){
		    ref.update({teban:1})
		}
		})
	
	   
	},
	species(k){//kは1,2,"_"
	    if(k==1){
		return "toad";
	    }
	    else if(k==2){
		return "frog";
	    }
	    else return "_";//
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
	    let kore=this
	    let ref = db.collection("games").doc("game")
	    ref.get().then(function(doc){
		if(doc.data().numplayer>=2){
		    return;
		}
		kore.teban=doc.data().numplayer+1
		ref.update({board:"[1,1,0,0,2,2]",teban:1,numplayer:kore.teban})
	    })	    
	    this.started=true		
	}
    }
}
</script>
