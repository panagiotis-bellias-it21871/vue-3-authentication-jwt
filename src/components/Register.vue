<template>
    <div class="register">
      <p class="lead">Select below the type of account you want to create</p>
      <button class="btn btn-block btn-stud" @click="$router.push('register/student')">I am a student</button>
      <button class="btn btn-block btn-teac" @click="$router.push('register/teacher')">I am a teacher</button><br/>
      <h5>If you have already an account click button below to login</h5>
      <button class="btn btn-block btn-login" @click="$router.push('login')">Login</button>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "RegisterPage",
    components: {
    },
    data() {
      return {
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    mounted() {
      if (this.loggedIn) {
        this.$router.push("/");
      }
    },
  };
  </script>
  
  <style scoped>
.lead {
  color: #fff;
}
h1 {
  color: #fff;
  padding: 0 15px;
  display: block;
}
h5 {
  color: #fff;
}  </style>
  