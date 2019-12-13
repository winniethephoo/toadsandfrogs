<template>
<div>
  <table border v-if="started">
    <tr>
      <td v-for="(k,i) in board" @click="move(i)">
	{{k}}
      </td>	
    </tr>
  </table>
  <b-button @click="start" v-if="!started">
    start
  </b-button>
</div>
</template>

<script>
export default{
    props:['M','N','L'],//プロパティ：ボードの性質を定める
    data(){
	return {
	    board:null,
	    started:false,
	    teban:1,
	    
	}
    },
    created(){
    },
    methods:{
	move(i){//i番目のセルが押された時
	    //
	    
	    let tmp=this.board[i]
	    this.board.splice(i,1,this.board[i+1])
	    this.board.splice(i+1,1,tmp)
	    
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
