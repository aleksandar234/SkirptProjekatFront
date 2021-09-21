<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand"> Home </router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="user">
          <li class="nav-item">
            <!-- <a href="javascript:void(0)" class="nav-link"><b> User: {{ user.first_name }} </b></a> -->
            <router-link to="/profile" class="nav-link">User: <b>{{ user.first_name }}</b></router-link
            >
          </li>
          <br />
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick" class="nav-link"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "Nav",
  data() {
    return {
      user: '',
      first_name: '',
      
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    
  },
  async created() {


    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    console.log(`Nav: got token=${token} and email=${email}`)

    if (!token || !email) return;

    // this.fetchUser(email).
    // then(() => {
    //   this.user = this.getUser;
    // })
    const header = { headers: { authorization: `Bearer ${token}` } };
    const res  = await axios.get(`http://localhost:3003/users/${email}`, header)
      .then((response) => {
          console.log(`got repose data in nav: ${JSON.stringify(response.data)}`)
          return response.data.user
      })

    this.user = res;
    // this.$router.go()


  },
  methods: {
    ...mapActions(['fetchUser']),

    handleClick() {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      window.location.href = "/"
    },
  },
};
</script>


<style scoped>
.navbar {
  background-color: rgb(45, 60, 197);
}
</style>