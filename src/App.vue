<template>
  <div id="app">
    <div id="header">
      <nav id="nav" class="navbar navbar-expand-lg navbar-dark mb-3">
        <div class="container">
          <router-link to="/" class="navbar-brand">{{siteTitle}}</router-link>
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
          <a href="https://github.com/panagiotis-bellias-it21871/reference-letters-system.git">
          <img style="position: absolute; top: 0; right: 0; border: 0;"
          src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
              alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
        </div>
      </nav>
    </div>

    <div class="container">
      <router-view />
      <br>
      <a data-cy="link" href="https://www.youtube.com/watch?v=-Pa3fUusLJ0&ab_channel=BasicsAdda">Tutorial 1</a> / 
      <a data-cy="link" href="https://www.google.com/url?q=https://www.bezkoder.com/vue-3-authentication-jwt/&sa=D&source=docs&ust=1664039034277234&usg=AOvVaw00dyzrYNL88J2O2hyr-D95">2</a> /
      <a data-cy="link" href="https://www.hua.gr/index.php/en/">Harokopio University</a> /
      <a data-cy="link" href="https://www.dit.hua.gr/index.php/en/">Department of Informatics and Telematics</a> /
      <a data-cy="link" href="https://github.com/panagiotis-bellias-it21871/reference-letters-system.git">GitHub repository</a> /
      <a data-cy="link" href="/about">Documentation</a>
    </div>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      siteTitle: "Reference Letters App",
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    username() {
      return this.$store.state.auth.username;
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
  },
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background: #222831;
}
body {
  background: #222831;
}
.container {
  max-width: 900px;
  color: lavender;
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
.navbar {
  background: #1a1d24;
  color:#fff;
}
.navbar-nav a {
  color: #fff;
  padding: 0 15px;
  display: block;
}
</style>
