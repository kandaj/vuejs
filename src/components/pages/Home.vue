<template>
  <div class="home">
    <div class="container">
      <br>
      <div class="columns">
        <div class="column">
          <h4>Error States</h4>
          <column-chart :data="errorStates"></column-chart>
        </div>
        <div class="column">
          <h4>Processing States</h4>
          <column-chart :data="processingStates"></column-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {eventBus} from '../../main';
  import ListStatus from '../files/ListStatus.vue';
  import ListFiles from '../files/ListFiles.vue';
  export default {
    name: 'Home',
    data () {
      return {
        loading: false,
        chartData: null,
        error: null,
        errorStates: null,
        processingStates:null
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      fetchData:function() {
        this.error = this.post = null
        this.loading = true
        // replace `getPost` with your data fetching util / API wrapper
        this.$http.get(`files/get_count/`)
          .then(response => {
            this.chartData = response.data.data;
            this.getChartData(this.chartData);
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getChartData(data){
        var errorStates = [25,15,10,7,13,6,9,50,52,3];
        var errorStateArryay = [];
        var normalStateArryay = [];
        var filteredArray = this.chartData.filter(function(itm){
          if(errorStates.indexOf(itm.archive_status_id) > -1){
            errorStateArryay.push([itm.archive_status_id,parseInt(itm.total)])
          } else{
            normalStateArryay.push([itm.archive_status_id,parseInt(itm.total)])
          }
        });
        this.errorStates = errorStateArryay;
        this.processingStates = normalStateArryay;
      }
    }
  }
</script>


<style>
  table
  {
    table-layout:fixed;
    width:100%;
    word-break:break-all;
  }

</style>
