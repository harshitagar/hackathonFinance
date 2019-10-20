define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
    this.view.postShow=this.PostShow;
  },
  PreShow:function(){
    this.view.flxOffers.onClick=this.navigateToOffers;
    this.view.flxTab1.onClick=this.tabOneSelected.bind(this);
    this.view.lbl11.onClick=this.tabOneSelected.bind(this);
    this.view.flxTab2.onClick=this.tabTwoSelected.bind(this);
    this.view.lbl21.onClick=this.tabTwoSelected.bind(this);
    this.view.flxTab3.onClick=this.tabThreeSelected.bind(this);
    this.view.lbl31.onClick=this.tabThreeSelected.bind(this);
    this.view.lblUserName.text="Hello! "+gblUserName;
    this.view.flxTransHistory.showFadingEdges=false;
    this.view.flxTransHistoryCredit.showFadingEdges=false;
    this.setAllData();
    this.view.flxSharePay.onClick = function(){
      commonNavigateFunction("frmpay");
    };
  },
  setAllData:function(){
    //     showDefaultLoading();
    var self = this;
    var params = gblUserName;
    var service = "getAllTransForUser";
    callService(service, params, userTransSuccessCall, userTransErrorCall);
    function userTransSuccessCall(res){
      var debit = [];
      var credit = [];
      try{
        var transData = res.Transactions;
        if(transData){
          for(var i=0;i<transData.length;i++)
          {
            transDataVal = transData[i];
            if(transDataVal.payeeUserName == gblUserName)
            {
              var temp = {"transactionName":transDataVal.transactionName,"amount":"$"+(transDataVal.amount/(transDataVal.usersName.length)).toFixed(2)};
              debit.push(temp);
              for(var k=0;k<transDataVal.usersName.length;k++)
              {
                var temp = {"transactionName":transDataVal.transactionName,"amount":"$"+(transDataVal.amount/(transDataVal.usersName.length)).toFixed(2)};
                credit.push(temp);
              } 	
            }
            else
            {
              var temp = {"transactionName":transDataVal.transactionName,"amount":"$"+(transDataVal.amount/(transDataVal.usersName.length)).toFixed(2)};
              debit.push(temp);
            }
          }
        }
        self.view.segTransaction.widgetDataMap={
          "lblName":"transactionName",
          "lblAmount":"amount"
        };
        self.view.segTransCredit.widgetDataMap={
          "lblName":"transactionName",
          "lblAmount":"amount"
        };
      }catch(e){
        hideDefaultLoading();
      }
      self.view.segTransaction.setData(debit);
      self.view.segTransCredit.setData(credit);
      self.getUserInfo();
    }
    function userTransErrorCall(res){
      hideDefaultLoading();
    }
  },
  getUserInfo:function(){
    /*
    "User": {
    "phoneNumber": 12,
    "_id": "5daabd08287fa053dace267f",
    "accountBalance": 1100000,
    "
    */
    var self = this;
    params = {"username":gblUserName};
    callService("getUser", params, userSuccessCall, userErrorCall);
    function userSuccessCall(res){
      self.view.lblBalance.text = "Balance: $"+res.User.accountBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+".00";
      hideDefaultLoading();
    }
    function userErrorCall(res){
      hideDefaultLoading();
    }
  },
  navigateToOffers:function(){
    commonNavigateFunction("frmOffersNearMe");
  },
  tabOneSelected:function(){
    animate(this.view.flxAnimate,{"left":"10%"},0.25,()=>{
      this.view.lbl2.skin="sknFooterInActive";
      this.view.lbl21.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterInActive";
      this.view.lbl31.skin="sknFooterInActive1";
      this.view.lbl1.skin="sknFooterActive";
      this.view.lbl11.skin="sknFooterActive1";
    });
    animate(this.view.flxHomeBody,{"left":"0%"});
  },
  tabTwoSelected:function(){
    animate(this.view.flxAnimate,{"left":"40%"},0.25,()=>{
      this.view.lbl1.skin="sknFooterInActive";
      this.view.lbl11.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterInActive";
      this.view.lbl31.skin="sknFooterInActive1";
      this.view.lbl2.skin="sknFooterActive";
      this.view.lbl21.skin="sknFooterActive1";
    });
    animate(this.view.flxHomeBody,{"left":"-100%"});
  },
  tabThreeSelected:function(){
    animate(this.view.flxAnimate,{"left":"70%"},0.25,()=>{
      this.view.lbl2.skin="sknFooterInActive";
      this.view.lbl21.skin="sknFooterInActive1";
      this.view.lbl1.skin="sknFooterInActive";
      this.view.lbl11.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterActive";
      this.view.lbl31.skin="sknFooterActive1";});
    animate(this.view.flxHomeBody,{"left":"-200%"});
  },
 
  PostShow:function(){

  },
  
  
});