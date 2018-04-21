<template>
  <div v-if="isNaN(statusCodeID) == false && statusCodeID != null">

    <b-container>
      <b-row  align-h="center" class="mt-5">
        <b-col cols="6">
          <div><h2 class="heading">Status {{statusCodeID}} Files</h2></div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-alert :show="dismissCountDown"
                   dismissible
                   variant="warning"
                   @dismissed="dismissCountdown=0"
                   @dismiss-count-down="countDownChanged">
            {{updatedRows}} row(s) has been updated
          </b-alert>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="2">
          <b-button class="btn btn-md" variant="primary" @click="clearChecked()">Clear Checked</b-button>
        </b-col>
        <b-col cols="5">
          <b-form-select v-model="selectedSC" :options="statusCodes">
            <template slot="first">
              <option :value="null" disabled>-- Please select an status --</option>
            </template>
          </b-form-select>
        </b-col>
        <b-col cols="5">
          <b-button class="btn btn-md" variant="info" :disabled="selectedSC == null || selectedSC === statusCodeID" @click="updateFiles()">Update</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <vue-good-table ref="listFilesTable"
            :columns="tableColumns"
            :rows="tableData"
            :pagination-options="{ enabled: true, perPage: perPage }"
            :select-options="{
              enabled: true,
              selectionInfoClass: 'info-custom'
             }"
            :search-options="{ enabled: true }">
            <div slot="selected-row-actions">
              <button>Action 1</button>
            </div>
          </vue-good-table>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
  import {eventBus} from '../../main'

  export default {
    name:'ListFiles',
    props:{
      statusCodeID: {
        type: Number
      }
    },
    data() {
      return{
        statusCodes:[1,4,14,34],
        selectedSC:null,
        tableData: [],
        tableColumns: [
          {
            field: 'file_name',
            label: 'File Name',
            width:500
          },
          {
            field: 'stable_id',
            label: 'Stable ID'
          },
          {
            field: 'staging_source',
            label: 'Box'
          },
          {
            field: 'submitted_file_name',
            label: 'Submitted File Name'
          }
        ],
        perPage: 10,
        checkedRows: [],
        updatedRows: false,
        showDismissibleAlert:false,
        dismissSecs: 3,
        dismissCountDown: 0
      }
    },
    watch: {
      statusCodeID() {
        if(this.statusCodeID != null){
          this.showFiles(this.statusCodeID);
          this.isActive = false;
        }
      }
    },
    methods: {
      showFiles:function(statusID){
        this.$http.get('/api/v1/audit/get_files/'+statusID)
          .then(response => {
            this.tableData = response.data.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      updateFiles:function(){
        let postData = []
        let stableIDArray = []
        this.checkedRows = this.$refs['listFilesTable'].selectedRows
        for (let value of this.checkedRows) {
          stableIDArray.push(value.stable_id)
        }
        console.log()
        postData.push({statusID:this.selectedSC,stableIDs:stableIDArray})
        return this.$http.post('/api/v1/audit/update_status/', postData)
          .then((response) => {
            this.updatedRows = response.data.data
            this.dismissCountDown = 3
            this.clearChecked()
            this.showFiles(this.statusCodeID)
            eventBus.$emit('refreshView')
          })
          .catch(e => {
            this.errors.push(e)
          })

      },
      clearChecked() {
        this.$refs['listFilesTable'].unselectAll()
        this.$refs['listFilesTable'].unselectAllInternal()
      }
    }
  }
</script>

<style>
  .heading {
    font-size:18px;
  }
  input {
    min-width:300px;
  }

</style>
