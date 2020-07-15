<template>
	<v-container class="mx-auto" max-width="100px">
		<h2>Login</h2>
		<v-form>
			<v-alert 
				v-if="errorMessage"
				border="right"
				colored-border
				type="error"
				elevation="2"
				>
				{{errorMessage}}
			</v-alert>
			<v-text-field
				v-model="email"
				:error-messages="emailErrors"
				label="E-mail"
				required
				@input="$v.email.$touch()"
				@blur="$v.email.$touch()"
			></v-text-field>
			<v-text-field
				v-model="password"
				:error-messages="passwordErrors"
				label="Password"
				type="password"
				required
				@input="$v.password.$touch()"
				@blur="$v.password.$touch()"
				@keypress.enter="submit"
			></v-text-field>
			<v-btn :disabled="disabled" class="mr-4" @click="submit" color="success">submit</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

import axios from 'axios';
import {eventBus} from "../main";

export default {
	mixins: [validationMixin],

	validations: {
		email: { required, email },
		password: { required },
	},
	data() {
		return {
			email: '',
			password: '',
			show: true,
			errorMessage: ''
		}
	},
	computed: {
		disabled() {
			return this.email.length == 0 || this.password.length == 0 || this.$v.$invalid
		},
		emailErrors () {
			const errors = []
			if (!this.$v.email.$dirty) return errors
			!this.$v.email.email && errors.push('Must be valid e-mail')
			!this.$v.email.required && errors.push('E-mail is required')
			return errors
		},
		passwordErrors () {
			const errors = []
			if (!this.$v.password.$dirty) return errors
			!this.$v.password.required && errors.push('Password is required.')
			return errors
		},
	},
	methods: {
		async submit () {
			this.$v.$touch()
			const result = await axios.post('/api/auth', {
				email: this.email,
				password: this.password
			});
			const response = result.data;
			if(!response.success) {
				this.$v.$reset()
				this.errorMessage = response.message
				this.email = ''
				this.password = ''
			} else {
				localStorage.setItem('Authorization', response.token)
				this.show = false;
				eventBus.$emit('login', response.token);
			}
		},
		clear () {
			this.$v.$reset()
			this.email = ''
			this.password = ''
		},
	}
}
</script>