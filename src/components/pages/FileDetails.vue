<template>
  <div id="fileDetails" class="mt-4">
    <b-row>
      <b-col cols="8">
        <b-input-group>
          <b-form-input v-model="stableInputValue"  placeholder="Enter File Stable ID"></b-form-input>
          &nbsp;
          <b-input-group-append>
            <b-button variant="info" :disabled="stableInputValue == null" @click="setStableId">Get Details</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="fileStableID !=null" class="column">
          <file-info :stableID="fileStableID"></file-info>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import FileInfo from '../files/FileInfo.vue';
  export default {
    components: {
      fileInfo:FileInfo
    },
    name: 'GetFileDetails',
    data() {
      return {
        stableInputValue:null,
        fileStableID:null
      }
    },
    methods:{
      setStableId: function(){
        this.fileStableID = this.stableInputValue;
      }
    }

  }
</script>
<!-- styling for the component -->
<style>

</style>
