// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import App from "./App";

Vue.config.productionTip = false;
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// Vue.use(Vuetify);
// import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
// import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader

import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
Vue.use(VueFire);
firebase.initializeApp({
  projectId: "burguer-queen-effio",
  databaseURL: "https://burguer-queen-effio.firebaseio.com",
  authDomain: "burguer-queen-effio.firebaseapp.com"
});
export const db = firebase.firestore();
export const bus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
