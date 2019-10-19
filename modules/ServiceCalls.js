//Type your code here
var MFserviceList = {
  "getAllUsers":{ "serviceName":"RhinoUserServices", "OperationName":"getAllUsers"}, 
  "getUser":{ "serviceName":"RhinoUserServices", "OperationName":"getUserInfo"}, 
  "signup":{ "serviceName":"RhinoLoginService", "OperationName":"RhinoSignup"},
  "signin":{ "serviceName":"RhinoLoginService", "OperationName":"RhinoSignin"},
  "nearByPleaces":{ "serviceName":"RhinoGoogleMapApi", "OperationName":"RhinoNearbyPlaces"},
  "visionAPI":{ "serviceName":"RhinoGoogleVisionApi", "OperationName":"RhinoImageLogoDetector"},
  "createNewGroup":{ "serviceName":"RhinoGroupServices", "OperationName":"RhinoAddNewGroup"},
  "showGroupsForUser":{ "serviceName":"RhinoGroupServices", "OperationName":"RhinoGetUserGroups"},
  "makeGroupTransaction":{ "serviceName":"RhinoTransactionServices", "OperationName":"RhinoShareTransaction"},
  "getAllTransForUser":{ "serviceName":"RhinoTransactionServices", "OperationName":"RhinoGetTransactionsAll"}
};
function callService(serviceKey, params, successCall, ErrorCall)
{
  var serviceName = MFserviceList[serviceKey].serviceName;
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  MFserviceList[serviceKey].OperationName;
  	var data = params;
//     var data= {"username": username,"password": password};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, data, successCall, ErrorCall);
}
