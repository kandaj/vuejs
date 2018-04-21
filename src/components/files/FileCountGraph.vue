<template>
  <b-row>
    <b-col cols="6">
      <b-row align-h="center">
        <h4>Error States</h4>
      </b-row>
      <column-chart :data="errorStates"></column-chart>
    </b-col>
    <b-col cols="6">
      <b-row align-h="center">
        <h4>Processing States</h4>
      </b-row>
      <column-chart :data="processingStates"></column-chart>
    </b-col>
  </b-row>
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
