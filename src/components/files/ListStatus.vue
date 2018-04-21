<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="6" class="mt-3">
          <b-row align-h="center">
            <b-button class="btn btn-outline-danger btn-md">Error states</b-button>
          </b-row>
          <b-row>
            <b-col cols="6" class="mt-3" v-for="(item, index) in errorStatesObject" :key="item.archive_status_id">
              <b-card :class="{'status-danger' : (item.total >  100 || item.archive_status_id == 10) ,'status-normal' : (item.total < 100 && item.archive_status_id != 10 )  }">
                <div class="card-text">
                  <h4>Status ID: {{ item.archive_status_id }}</h4>
                  <h6>{{item.total}} - Files</h6>
                </div>
                <b-button class="btn btn-sm" variant="primary" @click="setStatus(item.archive_status_id)">Show Files</b-button>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6" class="mt-3">
          <b-row align-h="center">
            <b-button class="btn btn-outline-success btn-md">Processing states</b-button>
          </b-row>
          <b-row>
            <b-col cols="6" class="mt-3" v-for="(item, index) in processingStatesObject" :key="item.archive_status_id">
              <b-card :class="{'status-danger' : (item.total >  100 || item.archive_status_id == 10) ,'status-normal' : (item.total < 100 && item.archive_status_id != 10 )  }">
                <div class="card-text">
                  <h4>Status ID: {{ item.archive_status_id }}</h4>
                  <h6>{{item.total}} - Files</h6>
                </div>
                <b-button class="btn btn-sm" variant="primary" @click="setStatus(item.archive_status_id)">Show Files</b-button>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
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
