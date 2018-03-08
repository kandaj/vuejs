<template>
  <div class="home container is-fluid">
    <div class="columns is-multiline">
      <div class="column is-3" v-for="item in data">
        <div class="card" :class="{'status-danger' : (item.total >  100 || item.archive_status_id == 10) ,'status-normal' : (item.total < 100 && item.archive_status_id != 10 )  }">
          <div class="card-content">
            <div class="content">
              <h2>Status ID: {{ item.archive_status_id }}</h2>
              <h4>{{item.total}} - Files</h4>
            </div>
            <button class="button is-info" @click="statusID = item.archive_status_id">Show Files</button>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <br/>
    <list-files :statusCodeID="parseInt(statusID)"  @refreshView="fetchData()"></list-files>
  </div>
</template>

<script>
  import ListFiles from '../files/ListFiles.vue';
  export default {
    components:{
      listFiles:ListFiles
    },
    name: 'Home',
    data () {
      return {
        loading: false,
        data: null,
        error: null,
        statusID:null,
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData()
    },
    computed: {
      // a computed getter
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData:function() {
        this.error = this.post = null
        this.loading = true
        // replace `getPost` with your data fetching util / API wrapper
        this.$http.get(`http://localhost:5000/files/get_count/`)
          .then(response => {
            this.data = response.data[0].data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>


<style scoped>
  .status-danger {
    background-color:#EB4C63;
  }

  .status-normal {
    background-color:#5ECEB3;
  }
</style>
