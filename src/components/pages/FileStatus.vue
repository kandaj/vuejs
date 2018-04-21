<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col>
          <list-status></list-status>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <list-files :statusCodeID="parseInt(statusID)"></list-files>
        </b-col>
      </b-row>
    </b-container>
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
