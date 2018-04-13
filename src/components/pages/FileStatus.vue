<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div class="column">
          <list-status></list-status>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <list-files :statusCodeID="parseInt(statusID)"></list-files>
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
      components:{
        ListStatus:ListStatus,
        listFiles:ListFiles
      },
    name: 'Home',
    data () {
      return {
        statusID:null
      }
    },
    created(){
      eventBus.$on('listFiles',(statusID) =>{
        this.statusID = statusID
      })
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
