<template>
  <div>
    <b-row class="mt-3">
      <b-col>
        <div v-if="fileInfoDetails !=null">
          <h2>File Information</h2>
          <table class="table is-fullwidth is-bordered">
            <tr><td><b>Stable ID</b></td><td>{{fileInfoDetails['stable_id']}}</td></tr>
            <tr><td><b>Archive Status</b></td><td>{{fileInfoDetails['archive_status_id']}}</td></tr>
            <tr><td><b>File Name</b></td><td>{{fileInfoDetails['file_name']}}</td></tr>
            <tr><td><b>Submitted File Name</b></td><td>{{fileInfoDetails['submitted_file_name']}}</td></tr>
            <tr><td><b>Staging Source</b></td><td>{{fileInfoDetails['staging_source']}}</td></tr>
            <tr><td><b>File Size</b></td><td>{{Number(fileInfoDetails['file_size'] / (1024*1024*1024)).toFixed(2)}} GB</td></tr>
            <tr><td><b>Run/Analysis Accession</b></td><td>{{fileInfoDetails['run_analysis_accession']}}</td></tr>
            <tr><td><b>File Created</b></td><td>{{fileInfoDetails['file_created']}}</td></tr>
            <tr><td><b>File Updated</b></td><td>{{fileInfoDetails['file_updated']}}</td></tr>
            <tr v-for="(value) in fileInfoDetails['checksums']">
              <td><b>{{value.process_step}}</b></td><td>{{value.md5_checksum}}</td>
            </tr>
          </table>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <!--<div class="column">-->
        <!--<h3>Process Log</h3>-->
        <!--<b-table-->
        <!--:data="tableData"-->
        <!--:columns="tableColumns"-->
        <!--:default-sort="['timestamp', 'desc']"-->
        <!--:paginated="isPaginated"-->
        <!--:per-page="perPage"-->
        <!--:current-page.sync="currentPage"-->
        <!--:pagination-simple="isPaginationSimple"-->
        <!--bordered >-->
        <!--</b-table>-->
        <!--</div>-->
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <div class=""><h2>Pipeline Log</h2></div>
        <div class="pipelinelog">
          <pre>{{filePipelineLog}}</pre>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name:'FileInfo',
    props:{
      stableID: {
        type: String,
        required:true
      }
    },
    data() {
      return {
        errors:null,
        fileInfoDetails:null,
        fileProcessLog:null,
        filePipelineLog:null,
        tableData: [],
        tableColumns: [
          {
            field: 'archive_status_id',
            label: 'Status ID',
          },
          {
            field: 'timestamp',
            label: 'Timestamp',
            sortable:true,
          }
        ],
        isPaginated: true,
        isPaginationSimple: false,
        currentPage: 1,
        perPage: 14,
      }
    },
    watch: {
      stableID() {
        if(this.stableID != null){
          this.getDetails(this.stableID);
//          this.getProcessLog(this.stableID);
          this.getPipelineLog(this.stableID);
        }
      }
    },
    mounted() {
      if(this.stableID != null) {
        this.getDetails(this.stableID);
//        this.getProcessLog(this.stableID);
        this.getPipelineLog(this.stableID);
      }
    },
    methods:{
      getDetails: function(){
        this.$http.get('/api/v1/audit/get_file_details/'+this.stableID)
          .then(response => {
            let data = response.data.data;
            data['checksums'] = this.getMD5(data.md5,data.process_step);
            this.fileInfoDetails = data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getProcessLog: function(){
        this.$http.get('/api/v1/audit/get_process_log/'+this.stableID)
          .then(response => {
            this.tableData = response.data.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getPipelineLog: function(){
        this.$http.get('/api/v1/audit/get_pipeline_log/'+this.stableID)
          .then(response => {
            this.filePipelineLog = response.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getMD5:function(md5, process_step){
        let md5Values = []
        if( md5 !== null) {
          let md5_temp = md5.split(',')
          let process_step_temp = process_step.split(',')
          for (let i =0; i < md5_temp.length;  i++) {
            md5Values[process_step_temp[i].replace(/\s+/g, ' ').trim()] = md5_temp[i].replace(/\s+/g, ' ').trim();
            md5Values.push({process_step:process_step_temp[i].replace(/\s+/g, ' ').trim(),md5_checksum:md5_temp[i].replace(/\s+/g, ' ').trim()});
          }
        }
        return md5Values;
      }
    }
  }
</script>

<style scoped>
  .pipelinelog {
    white-space: pre-line;
    text-align: left;
  }
  .pipelinelog pre{
    max-height: 420px;
    margin-bottom: 0 !important;
    overflow: scroll;
    max-width: 100%;
  }
  h3 {
    font-size:20px;
  }
</style>
