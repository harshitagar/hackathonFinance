define({ 

 //Type your controller code here 
  onClickLogin : function(){
    var serviceName = "RhinoLoginService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  "RhinoSignin";
    var username = this.view.tbxuserName.text;
    var password = this.view.tbxPassword.text;
    var data= {"username": username,"password": password};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
        commonNavigateFunction("frmHome");
      else
      alert("Wrong Password!");
      //code for success call back
    }
    function operationFailure(res){
      alert("Wrong Password!");
      //code for failure call back
    }
  }

});