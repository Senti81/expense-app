<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
				<v-icon v-on="on" dense color="red lighten-3">
					mdi-delete
				</v-icon>
      </template>
      <v-card>
				<v-card-title class="headline">Buchung löschen ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="reset">Nein</v-btn>
          <v-btn color="green darken-1" text @click="deleteExpense(id)">Ja</v-btn>
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
	},
	data () {
		return {
			dialog: false
		}
	},
	methods: {
		async deleteExpense(id) {
      try {
        await axios.delete(`api/expenses/${id}`, {
          headers: { 'Authorization': this.$store.getters.getToken }
        })
        this.$store.commit('deleteExpense', id)        
      } catch (error) {
        console.log(error)
      } finally {
        this.dialog = false
      }
    },
		reset() {
			this.dialog = false
		}
	}
}
</script>