import Vuex from 'vuex'
//import { firebaseMutations, firebaseAction } from 'vuexfire'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () =>({
    games:[],
});

export const mutations = {
	...vuexfireMutations
};

export const actions = {
    setGamesRef: firestoreAction(function(context,ref){
	context.bindFirestoreRef('games', ref)
	//gemesという変数にcollectionをbind:データベースに表示
    })
};

export const getters = {
    games: state => state.games
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
