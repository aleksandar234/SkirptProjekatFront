import Vue from 'vue'
import VueRouter from 'vue-router'
import OneMovie from '../views/OneMovie.vue'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AllMovies from '../views/AllMovies.vue'
import Profile from '../views/Profile.vue'
import ChangeTicket from '../views/ChangeTicket.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/allMovies',
    name: 'AllMovies',
    component: AllMovies
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/oneMovie',
    name: 'OneMovie',
    // props: true,
    component: OneMovie
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/changeTicket',
    name: 'ChangeTicket',
    component: ChangeTicket
  }
]

const router = new VueRouter({
  routes
})

export default router
