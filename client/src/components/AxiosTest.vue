<template>
    <b-container>
        <b-table striped hover :items="items"></b-table>
    </b-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async getAllUsers() {
      const allUsers = await axios.get('/users');
      this.items = allUsers.data;
    }
  },
  mounted() {
    this.getAllUsers();
  }
}
</script>