<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
				<v-icon v-on="on" dense color="blue lighten-3">
					mdi-file-edit
				</v-icon>
      </template>
      <v-card>
				<v-card-title class="headline">Buchung bearbeiten</v-card-title>
        <v-container>
					<v-text-field 
						v-model="amount"
						label="Neuer Betrag"
						type="number"
						step="0.01"
						autofocus
						required
						@keypress.enter="update(id)">
					</v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="reset">Abbrechen</v-btn>
          <v-btn color="green darken-1" text @click="update(id)">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
	props : {
		id: Number,
		amount: String
	},
	data () {
		return {
			dialog: false
		}
	},
	methods: {
		async update(id) {
			try {
				await axios.put(`api/expenses/${id}`, { amount: this.amount }, {
					headers: { 
						'Authorization': this.$store.getters.getToken 
					}
				})
				this.$store.dispatch('updateExpenses')
				this.dialog = false
			} catch (error) {
				console.error(error)
			}
		},
		reset() {
			this.dialog = false
		}
	}
}
</script>