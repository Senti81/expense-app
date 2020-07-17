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
						label="E-mail"
						required
						@focus="errorMessage=''"
					></v-text-field>
					<v-text-field
						v-model="password"
						label="Password"
						type="password"
						required
						@keypress.enter="submit"
					></v-text-field>
					<v-card-actions>
						<v-btn 
							block
							:disabled="disabled"
							@click="submit"
							color="primary"
							class="mt-4">
							Submit
						</v-btn>
					</v-card-actions>
				</v-form>
			</v-list-item-content>
		</v-list-item>
	</v-card>
</template>

<script>
import axios from 'axios';
import {eventBus} from "../main";

export default {
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
			return this.email.length == 0 || this.password.length < 4
		},
	},
	methods: {
		async submit () {
			const result = await axios.post('/api/auth', {
				email: this.email.trim(),
				password: this.password
			});
			const response = result.data;
			if(!response.success) {
				this.errorMessage = response.message
				this.email = ''
				this.password = ''
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
	.login {
		margin: 150px 0px;
	}
</style>