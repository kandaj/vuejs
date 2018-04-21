<template>
  <div id="app">
    <header-comp></header-comp>
    <navigation-menu></navigation-menu>
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
  import NavigationMenu from './components/commons/NavigationMenu.vue'
  export default {
    name: 'App',
    components:{
      HeaderComp: Header,
      FooterComp: Footer,
      NavigationMenu: NavigationMenu
    },
    mounted: function () {
    },
    methods: {
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

<style scoped>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 10px;*/
}
</style>
