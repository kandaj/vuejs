<template>
  <div id="app">
    <div id="content">
      <div data-sticky-container>
        <header id="masthead" class="masthead" data-sticky data-sticky-on="large" data-top-anchor="content:top" data-btm-anchor="content:bottom">
          <div class="masthead-inner row">
            <div class="columns" id="local-title">
              <h1><a><router-link v-bind:to="'/'">EGA Internal App</router-link></a></h1>
            </div>
            <nav  role="navigation" aria-label="main navigation">
              <ul id="local-nav" class="dropdown menu float-left" data-description="navigational">
                <li><a><router-link v-bind:to="'/'">Home</router-link></a></li>
                <li><a><router-link v-bind:to="'/file-status'">File Status</router-link></a></li>
                <li><a><router-link v-bind:to="'/file-details'">File Details</router-link></a></li>
                <li><a><router-link v-bind:to="'/dac-authorized-downloaders'">DAC Downloader Status</router-link></a></li>
                <li><a><router-link v-bind:to="'/login'">Login</router-link></a></li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      <section id="main-content-area" class="row" role="main">
        <br/>
        <router-view/>
      </section>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function () {
    $(".notifications-js").hide()
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
