<template>
  <b-container class="mt-3">
    <b-row>
      <b-col cols="6">
        <b-form v-on:submit.prevent>
          <b-form-group label="Username"
                        label-for="loginUsername">
            <b-form-input id="loginUsername"
                          type="email"
                          v-model="username"
                          placeholder="Enter your email">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Password"
                        label-for="loginPassword">
            <b-form-input id="loginPassword"
                          type="password"
                          placeholder="Enter your password"
                          v-model="password">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" @click="submitForm()">Submit</b-button>
          <!--<b-button type="reset" variant="danger">Reset</b-button>-->
        </b-form>
      </b-col>
    </b-row>
  </b-container>

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
