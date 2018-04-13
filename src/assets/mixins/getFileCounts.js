export const GetFileCounts = {
  data () {
    return {
      countData: null,
      error: null,
      statusID:null,
      sortedData: null,
      errorStates: null,
      processingStates: null,
      errorStatesObject: null,
      processingStatesObject: null
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData:function() {
      this.error = this.post = null
      this.loading = true
      // replace `getPost` with your data fetching util / API wrapper
      this.$http.get(`/api/v1/audit/get_count`)
        .then(response => {
          this.countData = response.data.data;
          this.getChartData();
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getChartData(){
      const errorStates = [25,15,10,7,13,6,9,50,52,3];
      const errorStateArray = [];
      const normalStateArray = [];
      const errorStateObject = [];
      const normalStateObject = [];
      const filteredArray = this.countData.filter(function(itm){
        if(errorStates.indexOf(itm.archive_status_id) > -1){
            errorStateObject.push(itm)
            errorStateArray.push([itm.archive_status_id,parseInt(itm.total)])
        } else{
          normalStateObject.push(itm)
          normalStateArray.push([itm.archive_status_id,parseInt(itm.total)])
        }
      });

      this.errorStates = errorStateArray;
      this.errorStatesObject = errorStateObject;
      this.processingStates = normalStateArray;
      this.processingStatesObject = normalStateObject;
    }
  }
}
