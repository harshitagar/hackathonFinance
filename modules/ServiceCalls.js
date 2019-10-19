//Type your code here
var MFserviceList = {
  "getAllUsers":{ "serviceName":"", "OperationName":""},
  "signup":{ "serviceName":"", "OperationName":""},
  "nearByPleaces":{ "serviceName":"", "OperationName":""},
  "visionAPI":{ "serviceName":"", "OperationName":""},
  "createNew":{ "serviceName":"", "OperationName":""},
  "showGropusForUser":{ "serviceName":"", "OperationName":""},
};
function callService(serviceKey, params, successCall, ErrorCall, frmObj)
{
  
  var serviceName = MFserviceList[serviceKey].serviceName;
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  MFserviceList[serviceKey].serviceName;
  	var data = params;
//     var data= {"username": username,"password": password};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, data, frmObj.successCall, frmObj.ErrorCall);
}