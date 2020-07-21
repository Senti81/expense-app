<template>
	<v-card
		class="mx-auto pa-8 login green lighten-5"
		max-width="496"
		max-height="786"
		outlined
		:elevation="8"
		>
		<v-img
      class="white--text align-end ma-3"
      height="80%"
      src="@/assets/cologne.jpg"
    >
			<v-card-title>Expense App</v-card-title>
    </v-img>
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
// import {eventBus} from "../main";

export default {
	data() {
		return {
			email: '',
			password: '',
			// show: true,
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
				this.$store.dispatch('validateToken', response.token)
				// this.$store.commit('setToken', response.token)
				// this.show = false;
				// eventBus.$emit('login', response.token);
				// this.$store.commit('login')
				// this.$store.dispatch('setToken', response.token)
			}
		}
	}
}
</script>

<style scoped>
	.login {
		margin: 8% 0px;
	}
</style>