<template>
  <div class="container">
    <br />
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">

        <b-field label="Username">
          <b-input v-model="username"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" v-model="password"></b-input>
        </b-field>
        <div class="field is-grouped">
          <div class="control">
            <button @click="submitForm()" class="button is-link">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        username: null,
        password:null
      }
    },
    methods:{
      submitForm: function(){
          console.log(this.username)
          console.log(this.password)
        var loginData = {
          "username":"jeff@ebi.ac.uk",
          "password":"jeff@ebi.ac.uk"

        }
        this.login(loginData);
      },
      login:function(data){
        this.$http.post(`http://ega-vault.ebi.ac.uk/ega_admin/test-login/user/login`,data)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>
