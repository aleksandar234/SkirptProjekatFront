<template>
  <div class="auth-wrapper">
    <h3 v-if="user">
      <div class="router" style="padding: 50px">
        <router-link
          to="/allMovies"
          style="text-align: center"
          v-if="user"
          class="nav-link">GoToMovies</router-link>
      </div>
    </h3>
    <h3 v-if="!user">You are not logged in</h3>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
  name: "LandingPage",
  data() {
    return {
      user: ''
    };
  },
  computed: {
      ...mapGetters(['getUser'])
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
          // console.log(`got repose data in nav: ${JSON.stringify(response.data)}`)
          return response.data.user
      })

    this.user = res;
  },
};
</script>
