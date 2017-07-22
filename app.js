var app = new Vue({
  el: '#app',
  data: {
      // Setup variables
      transfers: [],
      amount: '',
      merchant: '',
      bankAccount: 5824.76,
      transactionDate: '',
      merchantLogo: '',
      transactionType: '',
      categoryCode: '',
      search: '',
      isActive: false
  },
  methods: {
    // Push new withdrawal to results, takes the withdrawn money - the bankaccounts money
    addTransaction: function () {
      console.log("New transaction added!");
      var bankAcc = this.bankAccount;
      var amount = this.amount;
      this.bankAccount = bankAcc - amount;

      this.transfers.data.push({
        amount: this.amount,
        merchant: this.merchant,
        transactionDate: this.transactionDate,
        merchantLogo: this.merchantLogo,
        transactionType: this.transactionType,
     });
       this.amount = '';
       this.merchant = '';
   },
   filterAmount: function() {
     this.isActive = !this.isActive;
     var self = this;

      this.transfers.data.sort(function (a, b) {
          if (self.isActive == true){
            return a.amount - b.amount;
          }
          else {
             return  b.amount -  a.amount;
          }
      });
    },
      filterDate: function() {
        this.isActive = !this.isActive;
        var self = this;

         this.transfers.data.sort(function (a, b) {
             if (self.isActive == true){
               return a.transactionDate - b.transactionDate;
             }
             else {
                return  b.transactionDate -  a.transactionDate;
             }
      });
    }
 },
  // Fetches json array, and sets it as the transfers array that then gets looped in the html´s result field
  created() {
    axios.get("transactions.json")
     .then(response => {
        this.transfers = response.data;
     });
       // this.transfers = response.data
  },
   // Transforms the transactionDate into a readable date using moment.js
  filters: {
    moment: function (date) {
      return moment(date).format('MMM D');
    }
  }
});
