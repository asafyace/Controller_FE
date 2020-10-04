<template>
  <div id="app">
    <div>
      <b-navbar style="height: 45px" type="light" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        <b-navbar-brand>
          <router-link class="nav-link" :to="'/'">Home</router-link>
        </b-navbar-brand>
        <b-navbar-brand>
          <router-link class="nav-link" :to="'/configuration'"
            >Configuration</router-link
          >
        </b-navbar-brand>
        <b-navbar-brand>
          <router-link class="nav-link" :to="'/management'"
            >Management</router-link
          >
        </b-navbar-brand>
        <b-navbar-brand>
          <router-link class="nav-link" :to="'/scenarios'"
            >Scenarios</router-link
          >
        </b-navbar-brand>
        <b-navbar-brand>
          <router-link class="nav-link" :to="'/contact'">Contact</router-link>
        </b-navbar-brand>
        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav></b-navbar-nav>
        </b-collapse>
        <form class="form-inline my-2 my-lg-0">
          <p style="padding-top: 8px">Version 3.0</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Lab style="padding: 10px; padding-top: 20px"></Lab>&nbsp;
          <img
            style="padding-bottom: 25px"
            src="../static/logo.jpg"
            alt="controller"
          />
        </form>
      </b-navbar>
    </div>
    <router-view></router-view>

    <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
      <div class="container text-center">
        <small>&copy; Controller by AY</small>
      </div>
    </footer>
  </div>
</template>
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>
import Posts from "./components/Posts";
import Contact from "./components/Contact";
import Lab from "./components/Lab";
import Configuration from "./components/Configuration";
import Management from "./components/Management";
import Scenarios from "./components/Scenarios";

export default {
  name: "App",
  components: {
    Posts,
    Contact,
    Lab,
    Configuration,
    Management,
    Scenarios,
  },
};
</script>
<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

#sticky-footer {
  flex-shrink: none;
  bottom: 0;
  width: 100%;
}
</style>
