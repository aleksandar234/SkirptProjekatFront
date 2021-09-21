import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    movies: [],
    movie: {},
    users: [],
    user: {},
    reservations: [],
    reservation: {},
    data: {}
  },
  // getting the current state value
  getters: {  
    getMovies: state => state.movies,
    getMovie: state => state.movie,
    getUsers: state => state.users,
    getUser: state => state.user,
    getReservation: state => state.reservation,
    getReservations: state => state.reservations,
    getData: state => state.data
  },
  // when we do a action we call the mutation to change the state and we can get it with the getters
  mutations: {
    setMovies: (state,movies) => state.movies = movies,
    setUsers: (state,users) => state.users = users,
    newMovie: () => alert('movie added'),
    removeMovie: (state ,title) => state.movies = state.movies.filter(movie => movie.title !== title),
    removeReservation: (state, email, title) => state.reservations = state.reservations.filter(reservation => (reservation.user_email !== email && reservation.movieTitle !== title)),
    setMovie: (state,movie) => state.movie = movie,
    setUser: (state,user) => state.user = user,
    setReservation: (state, reservation) => state.reservation = reservation,
    setReservations: (state,reservations) => state.reservations = reservations,
    setData: (state, data) => state.data = data
    // searchMovie: (state ,title) => state.movies = state.movies.filter(movie => movie.title.includes(title))
  },
  // changing the value of the state
  _actions: {
    // user({commit}, user) {
    //   commit('setUser', user)
    // },
    async GET_MOVIES({ commit }) {
      await axios
        .get('http://localhost:3003/users')
        .then((response) => {
          const users = response.data.users
          commit("setUsers", users)
          console.log(users)
        })
        .catch((err) => {
          alert(err)
        })
    },
    async getAllMovies({commit}) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      await axios
          .get('http://localhost:3003/movies/getMovies', header)
          .then((response) => {
              const movies = response.data.movies
              commit("setMovies",movies)
              console.log(movies)
          })
          .catch((err) => {
              alert(err)
          })
    },
    async getAllReservations({commit}) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      await axios
          .get('http://localhost:3003/reserve/getReservations', header)
          .then((response) => {
              const reservations = response.data.reservations
              commit("setReservations",reservations)
              console.log(reservations)
          })
          .catch((err) => {
              alert(err)
          })
    },
    async addMovie({ commit }, payload) {
      await axios
        .post('http://localhost:3003/movies', {
          title: payload.title,
          mainActor: payload.mainActor,
          rating: payload.rating
        })
        .then((response) => {
          console.log(response.data.movie)
          commit('')
        })
        .catch((err) => {
          alert(err)
        })
    },
    async registerUser({ commit }, payload) {
      await axios
        .post('http://localhost:3003/users/postUser', {
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password
        })
        .then((response) => {
          console.log(response.data.user)
          commit('')
        })
        .catch((err) => {
          alert('User already Exists')
          console.log(err)
        })
    },
    // Dohvatanje iz baze:   fetchXXX(...)

    async fetchUser({ commit }, email) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      await axios
        .get(`http://localhost:3003/users/${email}`, header)
        .then((response) => {
          const user = response.data.user
          // console.log(user)
          commit('setUser', user)
        })
        .catch((err) => {
          if (err.response) {
            const status = err.response.status
            if (status === 401 || status == 403) {
              localStorage.removeItem('token')
              localStorage.removeItem('email')
              console.error('unauthorized get user call')
            } else {
              alert(err)
            }
          }
        })
    },
    async logInUser({ commit }, user) {
      await axios
        .post('http://localhost:3003/users/logIn', user)
        .then((response) => {
          const userData = response.data
          localStorage.setItem('token', userData.token)
          localStorage.setItem('email', userData.user.email)
          commit('setUser', userData.user)
        })
        .catch((err) => {
          alert(err)
          console.error(`failed to log in`)
        })
    },
    async deleteOneMovie({ commit }, title) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      await axios
        .delete(`http://localhost:3003/movies/${title}`, header)
        .then((response) => {
          console.log(response.data.movie)
          commit('removeMovie', title)
        })
        .catch((err) => {
          alert(err)
        })
    },
    async searchMovie({ commit }, title) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      await axios
        .get(`http://localhost:3003/movies/${title}`, header)
        .then((response) => {
          const movie = response.data.movie
          commit('setMovie', movie)
        })
        .catch((err) => {
          alert(err)
        })
    },
    async getReservation({ commit }) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      await axios
        .get('http://localhost:3003/reserve/getReservation', header)
        .then((response) => {
          const reservation = response.data.reservation
          commit('setReservation', reservation)
        })
        .catch((err) => {
          alert(err);
        })
    },
    async makeReservation({ commit }, payload) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      await axios
        .post('http://localhost:3003/reserve/makeReservation', payload, header)
        .then((response) => {
          console.log(response.data.reservation)
          commit('')
        })
        .catch((err) => {
          alert('Something went wrong with reservation')
          console.log(err)
        })
    },
    async deleteReservation({ commit }, payload) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      console.log(payload);
      const http = `http://localhost:3003/reserve/${payload.user}/${payload.movie}`
      console.log(http)
      await axios
        .delete(http, header)
        .then((response) => {
          console.log(response.data.user);
          commit('removeReservation',payload.user, payload.movie)
        })
        .catch((err) => {
          alert('Something went wrong with reservation')
          console.log(err)
        })
    },
    async changeReservation({ commit }, payload) {
      const token = localStorage.getItem('token')
      const header = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      console.log(payload);
      const http = 'http://localhost:3003/reserve/changeReservation'
      console.log(http)
      await axios
        .put(http, payload, header)
        .then((response) => {
          console.log(response.data.reservation);
          commit('');
        })
        .catch((err) => {
          alert('Something went wrong with changingReservation')
          console.log(err)
        })
    },
    async gettingData({ commit }, payload) {
      console.log(payload)
      commit('setData', payload)
    }
  },
get actions() {
    return this._actions
  },
set actions(value) {
    this._actions = value
  },
})
