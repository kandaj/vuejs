<template>
  <div class="container is-fluid">
      <div class="columns is-multiline">
        <div class="column is-" v-for="item in countData">
          <div class="card" :class="{'status-danger' : (item.total >  100 || item.archive_status_id == 10) ,'status-normal' : (item.total < 100 && item.archive_status_id != 10 )  }">
            <div class="card-content">
              <div class="content">
                <h2>Status ID: {{ item.archive_status_id }}</h2>
                <h4>{{item.total}} - Files</h4>
              </div>
              <button class="button is-info" @click="setStatus(item.archive_status_id)">Show Files</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {eventBus} from '../../main'

  export default {
    name: 'ListStatus',
    data () {
      return {
        countData: null,
        error: null,
        statusID:null,
      }
    },
    created () {
      eventBus.$on('refreshView',() => {
        this.fetchData();
      });
      this.fetchData();
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
        this.$http.get(`files/get_count/`)
          .then(response => {
            this.countData = response.data.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      setStatus:function(statusID){
        eventBus.$emit('listFiles',statusID)
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
