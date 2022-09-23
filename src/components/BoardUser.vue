<template>
    <div class="container">
      <header class="jumbotron">
        <h1>Profile</h1>
        <h2>You are {{ content.full_name }}</h2>
        <h4>Username: {{ content.username }}</h4>
        <h4>Email Address: {{ content.email }}</h4>
        <h4>Role: {{ this.role }}</h4>
      </header>
    </div>
  </template>
  
  <script>
  import UserService from "../services/user-service";
  
  export default {
    name: "BoardUser",
    data() {
      return {
        content: "",
        role: "",
      };
    },
    mounted() {
      UserService.getUserBoard().then(
        (response) => {
          this.content = response.data;
          if (this.content.student)
              this.role = "Student"
          else if(this.content.teacher)
              this.role = "Teacher"
          console.log(this.content);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  };
  </script>
  