<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-brand">
            <a class="navbar-item"><router-link v-bind:to="'/'">EGA</router-link></a>
          </div>
          <a class="navbar-item"><router-link v-bind:to="'/'">Home</router-link></a>
          <a class="navbar-item"><router-link v-bind:to="'/file-status'">File Status</router-link></a>
          <a class="navbar-item"><router-link v-bind:to="'/file-details'">File Details</router-link></a>
        </div>
        <div class="navbar-end">
          <a class="navbar-item"><router-link v-bind:to="'/login'">Login</router-link></a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
a {
  color:#FFFFFF;
}
</style>
