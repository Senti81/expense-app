<template>
  <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark">
    <template v-slot:header>Login</template>
    <template v-slot:lead>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, possimus.
    </template>
    <b-form @submit="onSubmit" v-if="show">
        <b-form-group label="Email address:" label-for="userEmail">
            <b-form-input
                id="userEmail"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email">
            </b-form-input>
        </b-form-group>
        <b-form-group  label="Password:" label-for="userPassword">
            <b-form-input
                id="userPassword"
                type="password"
                v-model="form.password"
                required
                placeholder="Enter password">
            </b-form-input>
        </b-form-group>
        <div class="msg">
            <em> {{ errorMessage }} </em>
        </div>
        <b-button class="loginBtn" block size="lg" type="submit" variant="primary">Login</b-button>
    </b-form>
  </b-jumbotron>    
</template>

<script>
import axios from 'axios';
import {eventBus} from "../main";

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            show: true,
            errorMessage: ''
        }
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            const result = await axios.post('/api/auth', this.form);
            const response = result.data;
            if(!response.success) {
                this.errorMessage = response.message
                this.form.email = ''
                this.form.password = ''
            } else {
                localStorage.setItem('Authorization', response.token)
                this.show = false;
                eventBus.$emit('login', response.token);
            }
        }
    }
}
</script>

<style scoped>
    .msg {
        margin: 0.5em 0.5em;
        text-align: start;
        color: red;
    }
    .loginBtn {
        margin-top: 2em;
    }
</style>