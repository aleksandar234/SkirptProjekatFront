<template>
  <div>
    <h1>Registration</h1>
      <div class="user">
         <form @submit="onSubmit">
          <input type="text" v-model="name" placeholder="Username... ">
          <input type="text" v-model="email" placeholder="Email... ">
          <input type="password" v-model="password" placeholder="Password... ">
          <input type="submit" value="Submit">
         </form>
      </div>
  </div>
</template>

<script>

// @ is an alias to /src
import {mapActions , mapGetters} from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['getUsers'])
  },
  methods: {
    ...mapActions(['GET_MOVIES','deleteOneMovie','searchMovie', 'addUser']),
      deleteMovie(title) {
      this.deleteOneMovie(title)
    },
    onSubmit(){
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.addUser(payload)
    },
    async search(){
      // e.preventDefault()
      await this.searchMovie(this.title)
      this.$router.push(`/${this.title}`)
    }
  },
  created() {
    this.GET_MOVIES() 
  }
}
</script>

<style scoped>
.card {
  padding: 10px ;
  margin: 50px;
  background: #101010;
  color:#a4a4a4;
  width:250px;
  height:320px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  margin-right:10px;
  margin-bottom: 15px;
  float: left;
}
</style>