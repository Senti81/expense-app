<template>
    <div>
        <b-table striped hover :items="items"></b-table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: [],
            show: true
        }
    },
    methods: {
        async loadExpenses() {
            const tokenFromStorage = localStorage.getItem('Authorization')
            if(tokenFromStorage) {
                try {
                    this.show = false;
                    const response = await axios.get('api/expenses', {
                        headers: { 'Authorization': tokenFromStorage}
                    })
                    this.items = response.data
                    
                } catch (error) {
                    localStorage.clear();
                }
            }
        }
    },
    mounted() {
        this.loadExpenses()            
    }
}
</script>