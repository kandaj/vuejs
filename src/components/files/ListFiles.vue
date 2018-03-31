<template>
  <div class="columns" v-if="isNaN(statusCodeID) == false && statusCodeID != null">
    <section>
      <transition>
        <b-notification :active.sync="isActive" type="is-success" has-icon>
          {{updatedRows}} row(s) has been updated
        </b-notification>
      </transition>

      <div class="column"><h2 class="heading">Status {{statusCodeID}} Files</h2></div>
      <div class="columns is-multiline">
        <div class="column">
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <button class="button field is-danger" @click="checkedRows = []"
                        :disabled="!checkedRows.length">
                  <span>Clear checked</span>
                </button>
              </div>
              <div class="level-item">
                <b-select v-model="selectedSC" placeholder="Select a status">
                  <option v-for="statusCode in statusCodes" :value="statusCode">
                    {{ statusCode }}
                  </option>
                </b-select>
              </div>
              <div class="level-item">
                <button class="button is-primary" :disabled="selectedSC == null || selectedSC === statusCodeID " @click="updateFiles()">Update Files</button>
              </div>
            </div>
          </nav>

        </div>
        <div class="column">

        </div>
        <div class="column">

        </div>
        <div class="column">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="Enter Term" v-model="searchTerm" v-on:keyup="filterTable()">
            </p>
            <p class="control">
              <a class="button is-info">
                Search
              </a>
            </p>
          </div>
        </div>
      </div>
      <b-table
        :data="tableData"
        :columns="tableColumns"
        :checked-rows.sync="checkedRows"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        checkable bordered >
        <template slot="bottom-left">
          <b>Total checked</b>: {{ checkedRows.length }}
        </template>
      </b-table>
    </section>
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
        statusCodes:[null,8,14,22,23,25],
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
        checkedRows: [],
        searchTerm:'',
        isPaginated: true,
        isPaginationSimple: false,
        defaultSortDirection: 'asc',
        currentPage: 1,
        perPage: 10,
        isActive: false,
        updatedRows: false
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
        this.$http.get('audit/get_files/'+statusID)
          .then(response => {
            this.tableData = response.data.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      filterTable:function(){
        var filterKey = this.searchTerm && this.searchTerm.toLowerCase()
        var data = this.tableData;
        if (this.searchTerm) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }else{
          this.showFiles(this.statusCodeID)
        }
        this.tableData = data;
        return this.tableData
      },
      updateFiles:function(){
        let postData = [];
        let stableIDArray = [];
        for (let value of this.checkedRows) {
          stableIDArray.push(value.stable_id);
        }
        postData.push({statusID:this.selectedSC,stableIDs:stableIDArray})
        return this.$http.post('audit/update_status/', postData)
          .then((response) => {
            this.updatedRows = response.data.data;
            this.isActive = true;
            this.checkedRows = [];
            this.showFiles(this.statusCodeID);
            eventBus.$emit('refreshView');
          })
          .catch(e => {
            this.errors.push(e)
          })

      }
    }
  }
</script>

<style scoped>
  .heading {
    font-size:18px;
  }
  input {
    min-width:300px;
  }

</style>
