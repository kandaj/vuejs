<template>
  <div id="fileDetails">
    <br />
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <section>
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <b-input v-model="stableInputValue" placeholder="Enter File Stable ID"></b-input>
                </div>
                <div class="level-item">
                  <button class="button is-primary" :disabled="stableInputValue == null" @click="setStableId">Get Details</button>
                </div>
              </div>
            </nav>
          </section>
        </div>
      </div>
      <div v-if="fileStableID !=null" class="column">
        <file-info :stableID="fileStableID"></file-info>
      </div>
    </div>
  </div>
</template>

<script>
  import FileInfo from './FileInfo.vue';
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
