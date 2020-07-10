<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Expense App 💲</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" v-if="loggedIn">
            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="New Expense"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Add</b-button>
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

export default {
    props: {
        loggedIn: Boolean,
        userName: String
    },
    methods: {
        logout() {
            eventBus.$emit('logout')
        }
    }
}
</script>