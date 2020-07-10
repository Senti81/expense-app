<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Expense App 💲</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" v-if="loggedIn">
            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="number" placeholder="New Expense" v-model="form.amount"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="addExpense">Add</b-button>
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <em>{{userName}}</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>          
            </b-nav-form>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>  
</template>

<script>
import { eventBus } from '../main'
import axios from 'axios'

export default {
    props: {
        loggedIn: Boolean,
        userName: String,
        token: String
    },
    data() {
        return {
            form: {
                amount: ''
            },    
        }
    },
    methods: {
        logout() {
            eventBus.$emit('logout')
        },
        async addExpense(e) {
            e.preventDefault()
            try {
                await axios.post('api/expenses', this.form, {
                    headers: { 'Authorization': this.token }
                })
                this.$bvToast.toast(`Updated Expense`, {
                    title: 'Success',
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-top-center',
                    autoHideDelay: 3000
                })
                eventBus.$emit('update expenses')
                this.form.amount = ''
            } catch (error) {
                this.$bvToast.toast(`${error}`, {
                    title: 'Success',
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-top-center',
                    autoHideDelay: 3000
                })
            }
        }
    }
}
</script>