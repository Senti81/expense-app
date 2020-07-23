import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('Authorization'),
    userDetails: {},
    expensesCurrentMonth: [],
    expensesLastMonth: [],
    contribution: 300
  },
  mutations: {
    updateExpensesList(state, payload) {
      state.expensesCurrentMonth = payload
    },
    loadExpensesFromLastMonth(state, payload) {
      state.expensesLastMonth = payload
    },
    setUserDetails(state, payload) {
      state.userDetails = payload
    },
    logout(state) {
      state.loggedIn = false
      state.token = '',
      state.userDetails = {},
      state.expenses = [],
      localStorage.removeItem('Authorization')
    },
    setToken(state, payload) {
      state.token = payload
    }  
  },
  actions:{
    async validateToken({commit}, token) {
      try {
        const userDetails = await axios.get('/api/auth', {
          headers: { 'Authorization': token }
        })
        commit('setToken', token)
        commit('setUserDetails', userDetails.data)        
      } catch (error) {
        console.error(error)
        commit('logout')
        localStorage.removeItem('Authorization')
      }
    },
    async updateExpenses({commit}) {
			const tokenFromStorage = localStorage.getItem('Authorization')
			if(tokenFromStorage) {
				try {
					const response = await axios.get('api/expenses/current', {
						headers: { 'Authorization': tokenFromStorage}
					})
          commit('updateExpensesList', response.data)
				} catch (error) {
					localStorage.clear();
				}
			}
		},
    async loadExpensesFromLastMonth({commit}) {
			const tokenFromStorage = localStorage.getItem('Authorization')
			if(tokenFromStorage) {
				try {
					const response = await axios.get('api/expenses/last', {
						headers: { 'Authorization': tokenFromStorage}
					})
          commit('loadExpensesFromLastMonth', response.data)
				} catch (error) {
					localStorage.clear();
				}
			}
		},
  },
  getters: {
    getExpensesCurrentMonth: state => state.expensesCurrentMonth,
    getExpensesLastMonth: state => state.expensesLastMonth,
    isLoggedIn: state => state.loggedIn,
    getUserDetails: state => state.userDetails,
    getToken: state => state.token,
    getContribution: state => state.contribution,
  }
})