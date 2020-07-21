<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
				<v-btn
					absolute
					fixed
					dark
					fab
					bottom
					right
					color="green"
					class="mb-10"
					v-on="on"
				>
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
						required
						@keypress.enter="addExpense">
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
export default {
	data () {
		return {
			dialog: false,
			amount: ''
		}
	},
	methods: {
		async addExpense() {
			try {
				await axios.post('api/expenses', { amount: this.amount }, {
					headers: { 
						'Authorization': this.$store.getters.getToken 
					}
				})
				this.$store.dispatch('updateExpenses')
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