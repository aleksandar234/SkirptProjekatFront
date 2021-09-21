<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <button class="btn btn-primary btn-block">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["logInUser", "fetchUser"]),
    handleSubmit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.logInUser(user).then(() => {
        this.fetchUser(this.email).then(() => {
          window.location.href = "/";
        });
      });
    },
  },
};
</script>

