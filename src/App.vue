<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark mb-3">
      <a href="/" class="navbar-brand">{{siteTitle}}</a>
      <div class="col-6 text-right">
        <p></p>
        <p>Web system about reference letters handling</p>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link"><font-awesome-icon icon="home" /> Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          </ul>
      </div>
      <div class="navbar-nav mr-auto">
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/login" class="btn btn-primary nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ username }}
          </router-link>
        </li>
        <li class="nav-item active">
          <a class="btn btn-primary nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
      
    </nav>

    <div class="container">
      <router-view />
      <br>
      <a data-cy="link" href="https://www.youtube.com/watch?v=-Pa3fUusLJ0&ab_channel=BasicsAdda">VueJS Tutorial</a> / 
      <a data-cy="link" href="https://www.hua.gr/index.php/en/">Harokopio University</a> /
      <a data-cy="link" href="https://www.dit.hua.gr/index.php/en/">Department of Informatics and Telematics</a> /
      <a data-cy="link" href="https://github.com/panagiotis-bellias-it21871/reference-letters-system.git">GitHub repository</a> /
      <a data-cy="link" href="/about">Documentation</a>
    </div>
  </div>
</template>

<script>
import UserService from './services/user-service';
export default {
  data() {
    return {
      username: "",
      siteTitle: "Reference Letters App",
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser) {
        return this.currentUser['is_superuser'];
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    if (!this.currentUser) {
    this.$router.push('/login');
    }
    UserService.getUserBoard().then(
    (response) => {
        this.username = response.data.username;
        console.log(this.username);
    },
    (error) => {
      console.log(error);
        this.username =
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: #222831;
}
.container {
  max-width: 900px;
  color: #e9d9b2;
}
.card {
  background: #1a1d24;
}
.card-body {
  color: #f9ffee;
}
.card-body a {
  color: #efbb35;
}
.btn-stud {
  color: #fff;
  background-color: blue;
  width: 220px;
  
}
.btn-teac {
  color: #fff;
  background-color: rgb(148, 7, 61);
  width: 220px;
}
.btn-login {
  color: #fff;
  background-color: rgb(128, 113, 119);
  width: 220px;
}
</style>
