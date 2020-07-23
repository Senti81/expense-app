<template>
  <v-card
    elevation="4"
    class="mx-4"
    >
    <v-overlay v-show="this.$store.getters.isLoading">Loading...</v-overlay>
    <v-simple-table
      class="my-2"
      fixed-header
      height="100%"
      dense
      >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center"><v-icon>mdi-menu</v-icon></th>
            <th class="text-left">Name</th>
            <th class="text-left">Date</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="item in getExpenseListForCurrentMonth" 
            :key="item.id" 
          >
            <td>
              <v-row>
                <v-col class="text-center">
                  <UpdateExpense
                    v-if="item.name === getUserDetails.name || getUserDetails.role === 'ADMIN'"
                    :id="item.id"
                    :amount="item.amount"
                  />
                </v-col>
                <v-col v-if="getUserDetails.role === 'ADMIN'">
                  <DeleteExpense                     
                    :id="item.id"
                  />
                </v-col>
              </v-row>
            </td>
            <td class="text-left">{{ item.name }}</td>
            <td class="text-left">{{ moment(item.created_at).format('DD.MM.YYYY') }}</td>
            <td class="text-right">{{ item.amount }} €
            </td>                           
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import UpdateExpense from './UpdateExpense'
import DeleteExpense from './DeleteExpense'

export default {
  components: {
    UpdateExpense,
    DeleteExpense
  },
  computed: {
    getUserDetails() {
      return this.$store.getters.getUserDetails
    },
    getExpenseListForCurrentMonth() {
      return this.$store.getters.getExpensesCurrentMonth
    }
  }
}
</script>