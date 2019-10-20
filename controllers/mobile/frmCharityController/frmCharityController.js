define({ 
onNavigate:function(){
    this.view.postShow=this.PostShow;
  },
 PostShow:function(){
   this.view.btnCreateTrans.onClick = this.onClickDone;
 },
 onClickDone:function(){
   var amount = parseInt(this.view.txtAmount.text);
   var donationAmount =  (parseInt(this.view.CopytbxTransType0fc13377df3f243.text)*(amount))/100;
   var totalAmount = amount+donationAmount;
  var params = {
      "username"		: gblUserName,
      "transactionName" : this.view.tbxTransactionName.text+"",
      "transactionType" : this.view.tbxTransType.text+"",
      "memberNames"     : gblUserName,
      "amount"          : totalAmount+"",
      "payeeUserName"   : gblUserName,
      "groupName"       : "DEFAULT",
      "memberNumbers"	: "8572014047~8960752539"
    };
    callService("makeGroupTransaction", params, transsuccessCall, transErrorCall)
    function transsuccessCall(res){
      if(res.success)
        alert("Done");
      else
        alert("Something went Wrong!");
      commonNavigateFunction("frmHome");
    }
   function transErrorCall(error){
     alert("make group transaction service error callback");
   }
 },
 });