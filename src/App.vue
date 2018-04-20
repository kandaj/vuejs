<template>
  <div id="app">
    <header-comp></header-comp>
    <nav role="navigation" class="navbar navbar-primary">
      <div class="container">
        <div id="navbarCollapse" class="navbar-collapse collapse">
          <div class="row visible-xs" rel="login-xs">
            <div class="col-md-12 nopad-l">
              <form id="login-xs" role="form" class="form-horizontal" method="post" accept-charset="UTF-8">
                <div class="col-xs-5 form-group">
                  <input type="text" id="username-xs" class="form-control" name="username" tabindex=1 placeholder="Username" required/>
                </div>
                <div class="col-xs-5 form-group">
                  <input type="password" class="form-control" id="password-xs" placeholder="Password" name="password" autocomplete="off" tabindex=2 required/>
                </div>
                <div class="col-xs-2 form-group">
                  <button class="btn btn-primary" id="sign-in" tabindex="3">Log in</button>
                </div>
              </form>
            </div>
          </div>
          <ul class="nav navbar-nav navbar-left">
            <li><a><router-link v-bind:to="'/'">Home</router-link></a></li>
            <li><a><router-link v-bind:to="'/file-status'">File Status</router-link></a></li>
            <li><a><router-link v-bind:to="'/file-details'">File Details</router-link></a></li>
            <li><a><router-link v-bind:to="'/dac-authorized-downloaders'">DAC Downloader Status</router-link></a></li>
            <li v-if="!isLoggedIn()"><a><router-link v-bind:to="'/login'">Login</router-link></a></li>
            <li v-if="isLoggedIn()"><a @click="logout">Logout</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-xs"></ul>
        </div>
      </div>
    </nav>
    <div class="main">
      <div class="container">
        <router-view/>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
  import { getHeader } from './assets/axios/http-common';
  import Header from './components/commons/Header.vue'
  import Footer from './components/commons/Footer.vue'
  export default {
    name: 'App',
    components:{
      HeaderComp: Header,
      FooterComp: Footer
    },
    mounted: function () {
    },
    methods: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      logout() {
        const options = getHeader()
        this.$httpWC.post(`http://ega-vault.ebi.ac.uk/ega_admin/test-login/user/logout`,'',options)
          .then(response => {
            window.localStorage.clear()
            this.$cookies.remove('X-CSRF-Token')
            this.$cookies.remove('CSRF-Token')
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 10px;*/
}
a {
  color:#FFFFFF;
}

h1 {
  font-size:30px;
}
</style>
