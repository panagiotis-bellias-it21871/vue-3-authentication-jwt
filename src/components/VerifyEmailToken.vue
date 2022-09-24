<template>
    <div class="verify-token">
      <div v-if=ok>
        <h2>Verified!</h2>
      </div>
      <div v-else><br/>
        <h3>Something went wrong! Please try again!</h3>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from "../services/auth-service.js";
  export default {
    name: 'VerifyEmailToken',
    data(){
      return {
        token: this.$route.params.token,
        errors: [],
        ok: false,
      }
    },
    mounted(){
        var token = this.token;
        AuthService.verifyToken(token).then(
            (response) => {
                this.ok = true;
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }
  }
  </script>
  