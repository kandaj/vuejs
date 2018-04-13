<template>
  <div class="container is-fluid">
    <div class="columns">
      <div  v-show="loading" class="column is-half is-offset-one-quarter">
        <img src="../../assets/images/index.ajax-spinner-gif.gif" alt="loading">
      </div>
      <div class="column" v-if="authorizedDownldStats != null">
        <b-table
          :data="tableData"
          :columns="tableColumns"
          :paginated="isPaginated"
           bordered >
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {eventBus} from '../../main'
  import {GetFileCounts} from '../../assets/mixins/getFileCounts';
  export default {
    name: 'DacAuthorizedDownloaders',
    data() {
      return {
        loading: false,
        errors:null,
        perPage: 14,
        authorizedDownldStats: null,
        tableData: [],
        tableColumns: [
          {
            field: 'dac_stable_id',
            label: 'DAC Stable ID',
          },
          {
            field: 'description',
            label: 'DAC Description'
          },
          {
            field: 'count',
            label: 'No of Downloaders'
          }
        ],
        isPaginated: false,
        defaultSortDirection: 'asc'
      }
    },
    created () {
      this.fetchData();
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData:function(){
        this.loading = true;
        // replace `getPost` with your data fetching util / API wrapper
        this.$http.get(`/api/v1/dac/get_downloaders_count`)
          .then(response => {
            this.authorizedDownldStats = response.data.data;
            this.tableData = response.data.data;
            this.loading = false;
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>

<style scoped>
  table {
    text-align: left;
  }
</style>
