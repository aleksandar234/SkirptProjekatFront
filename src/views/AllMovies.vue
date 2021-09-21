<template>
  <div>
    <!-- <h1 class="allMovies">Movies</h1>
    <div class="searchMovie">
    <form class="srch" @submit="search">
        <input class="nesto" type="text" placeholder="Search Movie... ">
        <input type="submit" value="Search">
    </form>
    </div>   -->
    <div class="movies">
      <h1 class="allMovies">Movies</h1>
    <div class="searchMovie">
    <form @submit="search">
        <input class="nesto" type="text" v-model="title" placeholder="Search Movie... ">
        <input type="submit" value="Search">
    </form>
    </div>  
      <div class="movie" v-for="movie in getMovies" :key="movie.id">
        <div class="column">
            <div class="card" @click="goToMovie(movie.title)" style="width: 18rem;">
              <img src="https://shareiitnow.b-cdn.net./wp-content/uploads/2019/12/Madara-Uchiha-quotes-1024x576.jpg" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">Main Actor: {{movie.mainActor}}</p>
                <!-- <i @click="deleteMovie(movie.title)" class="fas fa-trash-alt"></i> -->
          </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapActions , mapGetters} from 'vuex'

export default {
  name: 'AllMovies',
  data() {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapGetters(['getMovies'])
  },
  methods: {
    ...mapActions(['getAllMovies','deleteOneMovie','searchMovie']),
    deleteMovie(title) {
      this.deleteOneMovie(title)
    },
    async search(){
      // e.preventDefault()
      await this.searchMovie(this.title)
      .then(() => {
        this.$router.push({path: 'oneMovie'});
      })
      // this.$router.push('/oneMovie')
    },
    goToMovie(title){
      this.searchMovie(title)
      .then(() => {
        this.$router.push({path: 'oneMovie'});
      })
    }
  },
  created() {
    this.getAllMovies()
  }
}
</script>

<style scoped>

.srch {
  position: static;
}

.card {
  padding: 10px ;
  margin: 50px;
  background: border-box;
  border: none;
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

.searchMovie {
   position: center;
   padding: 30px;
}

</style>