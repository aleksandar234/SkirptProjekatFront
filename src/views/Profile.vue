<template>
  <div>
    <div class="card profile-picture" >
        <img src="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" style="width:30%">
        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
    </div>
    <div class="reservation" v-for="reservation in getReservations" :key="reservation.id">
        <div v-if="reservation.user_email === user.email">
        <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://www.enjpg.com/img/2020/peaky-blinders.png" class="img-fluid rounded-start" alt="...">
                        </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">{{ reservation.movieTitle }}</h3>
                            <p class="card-text">Projection Date: {{ reservation.projectionDate }}</p>
                            <p class="card-text">Projection Time: {{ reservation.projectionTime }}</p>
                            <div class="column">
                                <p>NumOfTickets: {{ reservation.numberOfPpl }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <form @submit="deleteRes(user.email, reservation.movieTitle)">
                                    <input type="submit" value="Delete">
                                </form>
                                <form @submit="changeRes(user.email, reservation.movieTitle, reservation.projectionTime, reservation.numberOfPpl)">
                                    <input type="submit" value="Change">
                                </form>
                            </div>
                        </div>
                </div>
             </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: "Profile",
    data() {
        return {
            user: ''
        }
    },
    methods: {
        ...mapActions(['getAllReservations', 'deleteReservation', 'gettingData', 'searchMovie']),
        deleteRes(user, movie) {
            let data = {user, movie}
            this.deleteReservation(data).then(() => {
                this.getAllReservations();
            })
        },
        async changeRes(user, movie, time, ppl) {
            let data = {user, movie, time, ppl}
            await this.gettingData(data)
            await this.searchMovie(movie)
            .then(() => {
                this.$router.push({path: '/changeTicket'});
            })
        }
    },
    computed: {
        ...mapGetters(['getReservations'])
    },
    async created() {
        this.getAllReservations();
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
        // const token = localStorage.getItem('token');
        // const userEmail = localStorage.getItem('user');
        // const response = await axios.get(`http://localhost:3003/users/${userEmail}`).then((res) => {
        //     if(!token) return
        //     else {
        //       return res.data.user
        //     }
        //     }).catch((err) => {
        //         alert(err)
        //     });
        // this.user = response
    }
}

</script>

<style scoped>

.profile-picture {
  box-shadow: 0 4px 8px  0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  margin-top: 60px; 
  text-align: center;
}

.card {
    box-shadow: 0 4px 8px  0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    margin-top: 60px; 
    text-align: center;
    
}

/* .mb-3 {
    background: border-box;
    border: none;
} */

.col-md-4 {
    margin-top: 14px;
}

</style>
