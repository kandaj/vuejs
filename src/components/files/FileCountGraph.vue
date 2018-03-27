<template>
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
</template>

<script>
  import {GetFileCounts} from '../../assets/mixins/getFileCounts';
  export default {
    name: 'FileCountGraph',
    mixins:[GetFileCounts]
  }
</script>

<style>

</style>
