<template>
    <div class="container">
        <header class="jumbotron">
        <h3>
            <strong>{{content.username}}</strong> Profile
        </h3>
        </header><!--
        <p>
        <strong>Token:</strong>
        {{currentUser.access_token.substring(0, 20)}} ... {{currentUser.access_token.substr(currentUser.access_token.length - 20)}}
        </p> -->
        <!-- <p>
        <strong>Id:</strong>
        {{content.id}}
        </p> -->
        <h4><strong>Full Name:</strong> {{content.full_name}}</h4>
        <h4><strong>Email:</strong> {{content.email}}</h4>
        <h4><strong>Authority:</strong> {{role}}</h4>
    </div>
</template>

<script>
import UserService from "../services/user-service";

export default {
name: 'ProfilePage',
computed: {
    currentUser() {
    return this.$store.state.auth.user;
    }
},
data() {
    return {
    content: "",
    role: "",
    };
},
mounted() {
    if (!this.currentUser) {
    this.$router.push('/login');
    }
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
