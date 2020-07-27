import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    token: localStorage.getItem('Authorization'),
    userDetails: {},
    expensesCurrentMonth: [],
    expensesLastMonth: [],
    contribution: 300
  },
  mutations: {
    toggleLoading: state => state.loading = !state.loading,
    refreshExpensesList: (state, payload) => state.expensesCurrentMonth = payload,
    setExpensesForLastMonth: (state, payload) => state.expensesLastMonth = payload,
    setUserDetails: (state, payload) => state.userDetails = payload,
    setToken: (state, payload) => state.token = payload,  
    logout(state) {
      state.token = '',
      state.userDetails = {},
      state.expenses = [],
      localStorage.removeItem('Authorization')
    },
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
    async refreshExpensesList({commit}) {
      commit('toggleLoading')
			if(this.state.token) {
				try {
					const response = await axios.get('api/expenses/', {
						headers: { 'Authorization': this.state.token }
					})

          const currentMonth = response.data.filter(expense => 
            moment(new Date(expense.created_at)).month() === moment().month() &&
            moment(new Date(expense.created_at)).year() === moment().year())
          commit('refreshExpensesList', currentMonth)

				} catch (error) {
					this.state.token = ''
				} finally {
          commit('toggleLoading')
        }
			}
		},
    async setExpensesForLastMonth({commit}) {
      commit('toggleLoading')
			if(this.state.token) {
				try {
					const response = await axios.get('api/expenses/', {
						headers: { 'Authorization': this.state.token }
          })
          
          const lastMonth = response.data.filter(expense => 
            moment(new Date(expense.created_at)).month() === moment().subtract(1, 'months').month() &&
            moment(new Date(expense.created_at)).year() === moment().year())
          commit('setExpensesForLastMonth', lastMonth)

				} catch (error) {
					this.state.token = ''
				} finally {
          commit('toggleLoading')
        }
			}
		},
  },
  getters: {
    isLoading: state => state.loading,
    getExpensesCurrentMonth: state => state.expensesCurrentMonth,
    getExpensesLastMonth: state => state.expensesLastMonth,
    getUserDetails: state => state.userDetails,
    getToken: state => state.token,
    getContribution: state => state.contribution,
  }
})