<template>
    <b-container>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group label="Email address:" label-for="userEmail">
                <b-form-input
                    id="userEmail"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email">
                </b-form-input>
            </b-form-group>
            <b-form-group  label="Password:" label-for="userPassword">
                <b-form-input
                    id="userPassword"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Enter password">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ formResponse }}</pre>
        </b-card>  
    </b-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            formResponse: '',
            show: true
        }
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            const result = await axios.post('/api/auth', this.form);
            const response = result.data;
            if(!response.success) {
                this.makeToast(response.message);
                this.form.email = ''
                this.form.password = ''
            } else {
                const token = response.token
                localStorage.setItem('Authorization', token)
                this.show = false;
                this.validateToken();
            }
        },
        async validateToken() {
            const tokenFromStorage = localStorage.getItem('Authorization')
            if(tokenFromStorage) {
                try {
                    this.show = false;
                    const response = await axios.get('api/expenses', {
                        headers: { 'Authorization': tokenFromStorage}
                    })
                    this.formResponse = response.data
                    
                } catch (error) {
                    localStorage.clear();
                    this.show = true
                }
            }
        },
        makeToast(message) {
            this.$bvToast.toast(`${message}`, {
                title: 'Error',
                variant: 'danger',
                solid: true,
                toaster: 'b-toaster-top-center',
                autoHideDelay: 5000
            })
        }
    },
    mounted() {
        this.validateToken()
    }
}
</script>