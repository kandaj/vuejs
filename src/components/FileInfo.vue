<template>
  <div class="columns">
    <div v-if="fileInfoDetails !=null" class="column">
      <table class="table is-fullwidth is-bordered">
        <tr><td><b>Stable ID</b></td><td>{{fileInfoDetails['stable_id']}}</td></tr>
        <tr><td><b>Archive Status</b></td><td>{{fileInfoDetails['archive_status_id']}}</td></tr>
        <tr><td><b>File Name</b></td><td>{{fileInfoDetails['file_name']}}</td></tr>
        <tr><td><b>Submitted File Name</b></td><td>{{fileInfoDetails['submitted_file_name']}}</td></tr>
        <tr><td><b>Staging Source</b></td><td>{{fileInfoDetails['staging_source']}}</td></tr>
        <tr><td><b>File Size</b></td><td>{{fileInfoDetails['file_size']}}</td></tr>
        <tr><td><b>Run/Analysis Accession</b></td><td>{{fileInfoDetails['run_analysis_accession']}}</td></tr>
        <tr><td><b>File Created</b></td><td>{{fileInfoDetails['file_created']}}</td></tr>
        <tr><td><b>File Updated</b></td><td>{{fileInfoDetails['file_updated']}}</td></tr>
        <tr v-for="(value) in fileInfoDetails['checksums']">
          <td><b>{{value.process_step}}</b></td><td>{{value.md5_checksum}}</td>
        </tr>
      </table>
    </div>
    <div class="column">
      <b-table
        :data="tableData"
        :columns="tableColumns"
        :default-sort="['timestamp', 'desc']"
        bordered >
      </b-table>
    </div>
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
        fileInfoDetails:null,
        fileProcessLog:null,
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
      }
    },
    watch: {
      stableID() {
        if(this.stableID != null){
          this.getDetails(this.stableID);
          this.getProcessLog(this.stableID);
        }
      }
    },
    mounted() {
      if(this.stableID != null) {
        this.getDetails(this.stableID);
        this.getProcessLog(this.stableID);
      }
    },
    methods:{
      getDetails: function(){
        this.$http.get('http://localhost:5000/files/get_details/'+this.stableID)
          .then(response => {
            let data = response.data[0].data[0];
            data['checksums'] = this.getMD5(data.md5,data.process_step);
            this.fileInfoDetails = data;
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      getProcessLog: function(){
        this.$http.get('http://localhost:5000/files/get_process_log/'+this.stableID)
          .then(response => {
            this.tableData = response.data[0].data;
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

<style>

</style>
