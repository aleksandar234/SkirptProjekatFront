<template>
    <div class="auth-wrapper">
        <div class="auth-inner">
    <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="first_name" placeholder="First Name">
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" v-model="last_name" placeholder="Last Name">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password">
        </div>

        <button class="btn btn-primary btn-block">Sign Up</button>
    </form>
    </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'Register',
        data() {
            return {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirm: ''
            }
        },
        methods: {
            ...mapActions(['registerUser']),
            handleSubmit() {
                if(this.password !== this.password_confirm){
                    alert('Password did not match')
                } else {
                        const data = {
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        password: this.password
                    }
                    this.registerUser(data);
                    this.$router.push('/login');
                }
            }
        }
    }

</script>
