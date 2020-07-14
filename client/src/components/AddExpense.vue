<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon
					v-bind="attrs"
					v-on="on">
					<v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
				<v-card-title class="headline">Input</v-card-title>
        <v-container>
					<v-text-field 
						v-model="amount"
						label="New Expense"
						type="number"
						autofocus
						required>
					</v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="reset">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="addExpense">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'
export default {
	props: {
			token: String
	},
	data () {
		return {
			dialog: false,
			amount: ''
		}
	},
	methods: {
		async addExpense() {
			const requestBody = {
				amount: this.amount
			}
			const headers = {
				headers: { 'Authorization': this.token }
			}
			try {
				await axios.post('api/expenses', requestBody, headers)
				eventBus.$emit('update expenses')
				this.dialog = false
			} catch (error) {
				console.error(error)
			} finally {
				this.amount = ''
			}
		},
		reset() {
			this.dialog = false
			this.amount = ''
		}
	}
}
</script>