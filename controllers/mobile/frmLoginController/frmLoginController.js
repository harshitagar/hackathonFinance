define({ 

  //Type your controller code here 
  onClickLogin : function(){
	if(!(this.view.tbxuserName.text && this.view.tbxPassword.text))
      return;
    showDefaultLoading();
    var serviceName = "RhinoLoginService";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  "RhinoSignin";
    var username = ""+this.view.tbxuserName.text;
    username=username.trim();
    var password = ""+this.view.tbxPassword.text;
    password = password.trim();
    gblUserName = username;
    var data= {"username": username,"password": password};
    var headers= {};
    callService("signin", data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
      {  
        commonNavigateFunction("frmHome");       
        // hideDefaultLoading();
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
    var self = this;
    kony.location.getCurrentPosition(function(response){
          gblLatitide = response.coords.latitude;
          gblLongitude = response.coords.longitude;
        });
  }
 
});