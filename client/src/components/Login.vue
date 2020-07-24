<template>
	<v-card
		class="mx-auto mt-16 pa-6 green lighten-5"
		max-width="496"
		max-height="786"
		outlined
		:elevation="8"
		>
		<v-overlay v-show="this.$store.getters.isLoading">Loading...</v-overlay>
		<v-card-title>🏡 Haushalts App</v-card-title>
		<v-list-item three-line>
			<v-list-item-content>
				<v-form>
					<v-alert 
						v-if="errorMessage"
						border="right"
						colored-border
						type="error"
						elevation="0"
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
						label="Passwort"
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
							Anmelden
						</v-btn>
					</v-card-actions>
				</v-form>
			</v-list-item-content>
		</v-list-item>
	</v-card>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			email: '',
			password: '',
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
			this.$store.commit('toggleLoading')
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
				this.$store.dispatch('validateToken', response.token)
			}
			this.$store.commit('toggleLoading')
		}
	}
}
</script>

<style scoped>
	.login {
		margin: 8% 0px;
	}
</style>