import Vuex from 'vuex'
//import { firebaseMutations, firebaseAction } from 'vuexfire'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () =>({
    games:[],//特定されてないboard
    thegame:null,//特定のidのboard
});

export const mutations = {
	...vuexfireMutations
};

export const actions = {
    setGamesRef: firestoreAction(function(context,ref){
	context.bindFirestoreRef('games', ref)
	//gemesという変数にcollectionをbind:データベースに表示
    }),
    setTheGameRef: firestoreAction(function(context,ref){
	context.bindFirestoreRef('thegame', ref)
	//thegemesという変数にfirebase上のドキュメントを参照させる（同期させる）
    })
};

export const getters = {
    games: state => state.games,
    thegame: state => state.thegame
}


//const createStore = () => {
//    return new Vuex.Store({
//	state: {
//	    games: [],
//	},
//	mutations: {
//		//...firebaseMutations
//		...vuexfireMutations
//	},
//	actions: {
//	    setGamesRef: firebaseAction(({ bindFirebaseRef }, ref) => {
//		bindFirebaseRef('games', ref)//gemesという変数にcollectionをbind:データベースに表示
//	    })
//	},
//	getters: {
//	    getGames: (state) => {
//		return state.games
//	    },
//	},
//    })
//}
//
//export default createStore
