<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-half">
        <button class="button is-medium">
          Error states
        </button>
        <div class="columns is-multiline">
          <div class="column is-" v-for="item in errorStatesObject">
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
      <div class="column is-half">
        <button class="button is-medium">
          Processing states
        </button>
        <div class="columns is-multiline">
          <div class="column is-" v-for="item in processingStatesObject">
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
    </div>
  </div>
</template>

<script>
  import {eventBus} from '../../main'
  import {GetFileCounts} from '../../assets/mixins/getFileCounts';
  export default {
    name: 'ListStatus',
    mixins:[GetFileCounts],
    created () {
      console.log(this)
      eventBus.$on('refreshView',() => {
        this.fetchData();
      });
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      setStatus:function(statusID){
        eventBus.$emit('listFiles',statusID)
      }
    }
  }
</script>

<style scoped>
  h3 {
    font-size: 22px;
  }
  .status-danger {
    background-color:#EB4C63;
  }

  .status-normal {
    background-color:#5ECEB3;
  }
</style>
