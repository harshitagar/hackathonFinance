define({ 

  //Type your controller code here 
  onClickLogin : function(){
    
    showDefaultLoading();
    var serviceName = "RhinoLoginService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  "RhinoSignin";
    var username = this.view.tbxuserName.text;
    gblUserName = username;
    var password = this.view.tbxPassword.text;
    var data= {"username": username,"password": password};
    var headers= {};
    callService("signin", data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
      {  
        commonNavigateFunction("frmHome");
        hideDefaultLoading();
      }
      else
      {
        hideDefaultLoading();
        alert("Wrong Password!");
      }
    }
    function operationFailure(res){
      hideDefaultLoading();
      alert("Wrong Password!");
      //code for failure call back
    }
  }

});