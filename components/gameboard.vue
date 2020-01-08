<template>
<div>
  <div v-if="teban!=null">
    You are  
    {{teban==2? "F":"T"}},
    and it is
    {{games["game"].teban==2? "F":"T"}}'s turn.
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
  <div v-if="started">
    <div v-if="games[0].finished">
      Finish
    </div>
  </div>
  <div>
    {{thegame}}
  </div>
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
	thegame(){
	    return db.collection("games").doc("game")
	},
	    ...mapGetters({games: 'games' }),
    },
    methods:{
	move(i){//i番目のセルが押された時
	    let kore=this
	    let ref = db.collection("games").doc("game")//firebabaseのcollectionの中のgamesの中のgameを呼び出す
	    ref.get().then(function(doc){//docを呼び出し　thenという関数の中のfunctionという関数を呼び出してる
		let board=JSON.parse(doc.data().board)//localにボードデータを保存
		let teban = doc.data().teban//firbaseの上にあるデータをlocalのteban変数に確認
		//console.log(board)
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
		let nextteban = 3-doc.data().teban
		let found = false
		for(let i in board){
		    console.log("i:" + i)
		    console.log("teban:"+nextteban)
		    console.log(board)
		    console.log(board[i])
		    if (i+1 < board.length && board[i*1+1]==0 ){
			console.log("it's true")
		    }
		    if(board[i]!=nextteban){
			continue
		    }
		    if(i+1<board.length && board[i*1+1]==0 && board[i]==1){
			console.log("a")
			found=true
			break
		    }
		    if(i+2<board.length && board[i*1+2]==0 && board[i*1+1]==2 && board[i]==1){
			console.log("b")
			found=true
			break
		    }
		    if(i>0 && board[i-1]==0 && board[i]==2){
			console.log("c")
			found=true
			break
		    }
		    if(i>1 && board[i-2]==0 && board[i-1]==1 && board[i]==2){
			console.log("d")
			found=true
			break
		    }
		}
		if (!found){
		    ref.update({numplayer:0})//refとはデータベースへのリファレンス
		    ref.update({finished:true})
		}
	    })	    
	},
	
	finished(){
	    //console.log(board)
	    //console.log(teban)
	    let kore=this
	    let ref = db.collection("games").doc("game")//firebabaseのcollectionの中のgamesの中のgameを呼び出す
	    ref.get().then(function(doc){//docを呼び出し　thenという関数の中のfunctionという関数を呼び出してる
		let board=JSON.parse(doc.data().board)//localにボードデータを保存
		let teban = doc.data().teban//firbaseの上にあるデータをlocalのteban変数に確認
		console.log(board)
		for(let i in board){
		    if(board[i]!=teban){
			continue
		    }
		    if(i+1<board.length && board[i+1]==0 && teban==1){
			return
		    }
		    if(i+2<board.length && board[i+2]==0 && board[i+1]==2 && teban==1){
			return
		    }
		    if(i>0 && board[i-1]==0 && board[i]==2){
			console.log("a")
			console.log(board)
			console.log(teban)
			return
		    }
		    if(i>1 && board[i-2]==0 && board[i-1]==1 && board[i]==2){
			console.log("b")
			console.log(board)
			console.log(teban)
			return
		    }
		}
		ref.update({numplayer:0})//refとはデータベースへのリファレンス
		//fnd=true
		ref.update({finished:true})
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
	    
	    ref.get().then(function(doc){
		if(doc.data().numplayer>=2){
		    return;
		}
		kore.teban=doc.data().numplayer+1
		ref.update({board:JSON.stringify(board),teban:1,numplayer:kore.teban,finished:false})
	    })	    
	    this.started=true		
	}
    }
}
</script>
