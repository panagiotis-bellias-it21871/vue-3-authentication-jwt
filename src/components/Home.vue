<template>
    <div class="home">
      <img alt="Reference Letter Logo" src="../assets/logo.jpg">
      <div v-if="loggedIn">
        <AddReferenceLetterRequest v-on:add-reference-letter-request="addRlRequest"/>
        <ReferenceLetterRequestList v-bind:rl_requests="rl_requests" v-bind:errors="errors"/>
        <!--
        <ReferenceLetterRequestList v-on:del-rl-request="deleteRlRequest" v-bind:rl_requests="rl_requests" v-bind:errors="errors"/>  
        <header class="jumbotron">
          <h3>{{ rl_requests }}</h3>
        </header>-->
      </div>
      <div v-else><br/>
        <RegisterPage/>
        <OwnerDetails/>
      </div>
    </div>
  </template>
  
  <script>
import DataService from "../services/data-service";
import UserService from "../services/user-service";
import RegisterPage from "./Register.vue";
import OwnerDetails from "./OwnerDetails.vue";
import AddReferenceLetterRequest from "./AddReferenceLetterRequest.vue";
import ReferenceLetterRequestList from "./ReferenceLetterRequestList.vue";
  
  export default {
    name: "HomePage",
    components: { 
      RegisterPage, 
      OwnerDetails, 
      AddReferenceLetterRequest, 
      ReferenceLetterRequestList 
    },
    data() {
        return {
            username: "",
            student_id: 0,
            rl_requests: [],
            errors: [],
        };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    methods : {
      addRlRequest(newRlRequest) {
        const { teacher_id, carrier_name, carrier_email } = newRlRequest;
        console.log(teacher_id, carrier_name, carrier_email)
        const status = "pending"
        const text = ""
        
        DataService.createRlRequest(carrier_name, carrier_email, status, text, teacher_id, this.student_id).then((response) => 
        (this.rl_requests = [...this.rl_requests, response.data]),
        (error) => {
            this.rl_requests =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
        });
      }, /*
      deleteRlRequest(id) {
        console.log(id);
      }*/
    },
    mounted() { 
      if(this.loggedIn) {
        UserService.getUserBoard().then(
        (response) => {
            this.username = response.data.username;
            console.log(this.username);
        },
        (error) => {
          this.username =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        });
        UserService.getStudentInfo(this.username).then(
          (response) => {
            this.student_id = response.data.id;
            console.log(this.student_id);
       },
        (error) => {
          this.student_id = -1;
          console.log(error);
       });
      }
    }    
};
  </script>
  