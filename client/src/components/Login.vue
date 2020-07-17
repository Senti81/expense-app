<template>
	<v-card
		class="mx-auto pa-8 login green lighten-5"
    max-width="384"
		max-height="428"
    outlined
		:elevation="8"
		>
		<v-list-item three-line>
			<v-list-item-content>
				<v-list-item-title class="headline mb-8">Login</v-list-item-title>
				<v-form>
					<v-alert 
						v-if="errorMessage"
						border="right"
						colored-border
						type="error"
						elevation="4"
						>
						{{errorMessage}}
					</v-alert>
					<v-text-field
						v-model="email"
						:error-messages="emailErrors"
						label="E-mail"
						required
						@focus="errorMessage=''"
						@input="$v.email.$touch()"
						@blur="$v.email.$touch()"
					></v-text-field>
					<v-text-field
						v-model="password"
						label="Password"
						type="password"
						required
						@input="$v.password.$touch()"
						@blur="$v.password.$touch()"
						@keypress.enter="submit"
					></v-text-field>
					<v-card-actions>
							<v-btn block :disabled="disabled" @click="submit" color="primary" class="mt-4">Submit</v-btn>
					</v-card-actions>
				</v-form>
			</v-list-item-content>
		</v-list-item>
	</v-card>
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
			return this.email.length == 0 || this.password.length < 4 || this.$v.$invalid
		},
		emailErrors () {
			const errors = []
			if (!this.$v.email.$dirty) return errors
			!this.$v.email.email && errors.push('Must be valid e-mail')
			!this.$v.email.required && errors.push('E-mail is required')
			return errors
		}
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

<style scoped>
	.login {
		margin: 150px 0px;
	}
</style>