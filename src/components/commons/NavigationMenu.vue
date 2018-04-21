<template>
  <nav role="navigation" class="navbar navbar-expand-lg navbar-light navbar-primary">
    <div class="container">
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="nav navbar-nav navbar-left">
          <li class="nav-item"><a class="nav-link"><router-link v-bind:to="'/'">Home</router-link></a></li>
          <li class="nav-item"><a class="nav-link"><router-link v-bind:to="'/file-status'">File Status</router-link></a></li>
          <li class="nav-item"><a class="nav-link"><router-link v-bind:to="'/file-details'">File Details</router-link></a></li>
          <li class="nav-item"><a class="nav-link"><router-link v-bind:to="'/dac-authorized-downloaders'">DAC Downloader Status</router-link></a></li>
          <li class="nav-item"v-if="!isLoggedIn()"><a class="nav-link"><router-link v-bind:to="'/login'">Login</router-link></a></li>
          <li class="nav-item"  v-if="isLoggedIn()"><a class="nav-link" @click="logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'NavigationMenu',
    methods: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      }
    }
  }
</script>
<style @scoped>
  .navbar-left li > a > a.router-link-exact-active {
    color: #fff;
    background-color: #144363;
  }

  a {
    color:#FFFFFF;
  }
</style>
