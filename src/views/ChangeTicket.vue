<template>
       <div class="movie">
        <div v-if="user">
        <!-- <h1 class="bigT" style="color: blue"> {{ this.getMovie.title }}</h1>
        <div class="card" style="width: 30rem;">
              <img src="https://shareiitnow.b-cdn.net./wp-content/uploads/2019/12/Madara-Uchiha-quotes-1024x576.jpg" class="card-img-top" alt="...">
                <h5 class="card-title" style="color:purple">{{ this.getMovie.title }}</h5>
                <p class="card-text" style="color: purple">{{this.getMovie.title}}</p>
          </div> -->
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://www.enjpg.com/img/2020/peaky-blinders.png" class="img-fluid rounded-start" alt="...">
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title">{{ this.getMovie.title }}</h3>
                        <p class="card-text">Projection Time: </p>
                        <div class="d-flex justify-content-between">
                            <input type="radio" id="one" value="Fst" v-model="picked">
                            <label for="one">{{ this.getMovie.projectionTimeOne }}</label>
                            <input type="radio" id="two" value="Snd" v-model="picked">
                            <label for="two">{{ this.getMovie.projectionTimeTwo }}</label>
                            <input type="radio" id="three" value="Trd" v-model="picked">
                            <label for="three">{{ this.getMovie.projectionTimeThree }}</label>
                            <!-- <span>Picked: {{ picked }}</span> -->
                        </div>
                        <div class="d-flex justify-content-between">
                            <p>NumOfTickets: </p>
                            <input class="numOfPpl" min="1" type="number" v-model="num" placeholder="Num of tickets... ">
                        </div>
                        <div class="d-flex justify-content-between">
                                <form @submit="cancelRes()">
                                    <input type="submit" value="Cancel">
                                </form>
                                <form @submit="saveChanges()">
                                    <input type="submit" value="SaveChange">
                                </form>
                            </div>
                    </div>
                </div>
             </div>
    </div>
        </div>
    <div>
        <h1 v-if="!user">Nisi ulogovan</h1>
    </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

export default {
    name: "ChangeTicket",
    data() {
        return {
            user: '',
            title: '',
            picked: null,
            num: 1
        }
    },
    computed: {
        ...mapGetters(['getData', 'getMovie'])
    },
    methods: {
        ...mapActions(['changeReservation']),
        cancelRes() {
            this.$router.push({path: '/profile'});
        },
        saveChanges() {
            if(this.picked === "Fst") this.picked = this.getMovie.projectionTimeOne
            else if(this.picked === "Snd") this.picked = this.getMovie.projectionTimeTwo
            else if(this.picked === "Trd") this.picked = this.getMovie.projectionTimeThree
            else this.picked = null
            const payload = {
                user_email: this.user.email,
                movieTitle: this.getMovie.title,
                projectionTime: this.picked,
                numberOfPpl: this.num
            }
            this.changeReservation(payload)
            .then(() => {
                this.$router.push({path: 'profile'});
            })
        }
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