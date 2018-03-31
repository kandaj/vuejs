export const GetFileCounts = {
  data () {
    return {
      countData: null,
      error: null,
      statusID:null,
      sortedData: null,
      errorStates: null,
      processingStates:null
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
      this.$http.get(`audit/get_count`)
        .then(response => {
          this.countData = response.data.data;
          this.getSortedData();
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getSortedData(){
      const errorStates = [25,15,10,7,13,6,9,50,52,3];
      const errorStateArryay = [];
      const normalStateArryay = [];
      const filteredArray = this.countData.filter(function(itm){
        if(errorStates.indexOf(itm.archive_status_id) > -1){
          errorStateArryay.push([itm.archive_status_id,parseInt(itm.total)])
        } else{
          normalStateArryay.push([itm.archive_status_id,parseInt(itm.total)])
        }
      });

      this.errorStates = errorStateArryay;
      this.processingStates = normalStateArryay;
    }
  }
}
