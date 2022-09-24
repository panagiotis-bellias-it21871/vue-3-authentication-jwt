<template>
  <div class="signupteacher">
    <div class="row">
      <div class="col-md-8 col-sm-10 col-12">
        <h2>Sign up as a teacher</h2>
        <div class="card card-container"><!--
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />-->
          <Form @submit="handleRegister" :validation-schema="schema">
            <div v-if="!successful">
              <div class="form-group">
                <label for="username">Username</label>
                <Field name="username" type="text" class="form-control"  placeholder="Enter your username" />
                <ErrorMessage name="username" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="email" class="form-control"  placeholder="Enter your email address" />
                <ErrorMessage name="email" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="fullname">Full Name</label>
                <Field name="fullname" type="text" class="form-control"  placeholder="Enter your full name" />
                <ErrorMessage name="fullname" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="description">Tell us a few words for yourself!</label>
                <textarea type="text" name="description" rows="9" cols="40"
                class="form-control"  placeholder="Studies / Titles / Work / Projects" />
                <ErrorMessage name="description" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <Field name="password" type="password" class="form-control"   placeholder="Enter your password"/>
                <ErrorMessage name="password" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="password2">Password Confirmation</label>
                <Field name="password2" type="password" class="form-control"   placeholder="Confirm your password"/>
                <ErrorMessage name="password2" class="error-feedback"/>
              </div>

              <div class="row">
                <button class="btn btn-primary btn-block col-6 mx-auto" :disabled="loading">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
    
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  
  export default {
    name: "RegisterTeacher",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schema = yup.object().shape({
        username: yup
          .string()
          .required("Username is required!")
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
        email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
        fullname: yup
          .string()
          .required("Full name is required!")
          .max(50, "Must be maximum 50 characters!"),
        description: yup
          .string(),
        password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
        password2: yup
          .string()
          .required("Password confirmation is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
      });
  
      return {
        successful: false,
        loading: false,
        message: "",
        schema,
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    mounted() {
      if (this.loggedIn) {
        this.$router.push("/profile");
      }
    },
    methods: {
      handleRegister(teacher) {
        this.message = "";
        this.successful = false;
        if(teacher.password != teacher.password2) {
          this.message = "Passwords don't match"
          return;
        }
        this.loading = true;
  
        this.$store.dispatch("auth/registerTeacher", teacher).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
            alert("Check your email account to follow the account verification link.")
            this.$router.push("/")
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
          }
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .signupteacher {
  color: #fff;
}
h1 {
  color: #fff;
  padding: 0 15px;
  display: block;
}
h5 {
  color: #fff;
}
  </style>
  