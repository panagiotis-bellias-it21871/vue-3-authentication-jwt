import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import RegisterStudent from "./components/RegisterStudent.vue";
import RegisterTeacher from "./components/RegisterTeacher.vue";
import VerifyEmailToken from "./components/VerifyEmailToken.vue";
import AboutPage from "./components/AboutPage.vue";
import ReferenceLetterRequestDetails from "./components/ReferenceLetterRequestDetails.vue"
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardAdminStudents = () => import("./components/BoardAdminStudents.vue")
const BoardAdminTeachers = () => import("./components/BoardAdminTeachers.vue")
const BoardAdminRlRequests = () => import("./components/BoardAdminRlRequests.vue")
//const BoardModerator = () => import("./components/BoardModerator.vue")
//const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/register/student",
    component: RegisterStudent,
  },
  {
    path: "/register/teacher",
    component: RegisterTeacher,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/admin/students",
    name: "admin-students",
    // lazy-loaded
    component: BoardAdminStudents,
  },
  {
    path: "/admin/teachers",
    name: "admin-teachers",
    // lazy-loaded
    component: BoardAdminTeachers,
  },
  {
    path: "/admin/reference-letter-requests",
    name: "admin-rl-requests",
    // lazy-loaded
    component: BoardAdminRlRequests,
  },/*
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },*/
  {
    path: '/verify_token/:token',
    name: 'verify-token',
    component: VerifyEmailToken
  },
  {
    path: "/reference-letter-request/:id",
    name: "rl-request-details",
    component: ReferenceLetterRequestDetails
  },
  // otherwise redirect to home
  // { path: "*", redirect: "/" }
];

const router = createRouter({
  //history: createWebHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/*
router.beforeEach((to, from, next) => {
    const publicPages = ['/verify_token', '/home', '/', '/register', '/login', '/register/student', '/register/teacher', '/about'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
*/
export default router;
