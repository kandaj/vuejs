<template>
  <div class="container">
    <br />
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">

        <form  v-on:submit.prevent>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="username">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary" @click="submitForm()">Submit</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import { getHeader } from '../../assets/axios/http-common'
  export default {
    data() {
      return {
        username: null,
        password:null
      }
    },
    methods: {
      submitForm: function(){
        var loginData = {
          "username": this.username,
          "password": this.password
        }
        this.login(loginData);
      },
      login: function(data){
        const authUser = {}
        const options = getHeader()
        var app = this
        this.$httpWC.post(`http://ega-vault.ebi.ac.uk/ega_admin/test-login/user/login`,data)
          .then(response => {
            const data = response.data
            if ( response.status == 200 ) {
              this.tokenCompare(data.token).then(value => {
                if (value) {
                  console.log('logging in')
                  authUser.data = data.user
                  authUser.sessid = data.sessid
                  authUser.session_name = data.session_name
                  authUser.token = data.token
                  app.$cookies.set("X-CSRF-Token", data.token)
                  window.localStorage.setItem('drupUser',JSON.stringify(authUser))
                }
              }).catch(e => {
                console.log('out')
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      tokenCompare: function(tokenToCompareFromLogin){
        let loggedIn = false
        return this.$httpWC.post(`http://ega-vault.ebi.ac.uk/ega_admin/test-login/user/token`)
          .then(response => {
            if (response.data.token == tokenToCompareFromLogin) {
              console.log ("We are finally logged in","");
              loggedIn = true
              return loggedIn
            } else {
              console.log ("We are not logged in", "");
            }
            console.log('Token', response.data.token);
            console.log('Login', tokenToCompareFromLogin);
          })
          .catch(e => {
            console.log(e)
          })

      }
    }
  }
</script>
