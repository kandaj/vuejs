<template>
  <div class="home">
    <div class="container">
      <file-count-graph></file-count-graph>
    </div>
  </div>
</template>

<script>
  import FileCountGraph from '../files/FileCountGraph.vue';
  export default {
    components:{
      FileCountGraph:FileCountGraph
    },
    name: 'Home',
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
