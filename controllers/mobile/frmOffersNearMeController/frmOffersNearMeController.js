define({
  _formName : "frmOffersNearMe",
  /**
     * @function onNavigate
     * @description default buildin method onNavigate called from navigate API
	 * @param {object} context
	 * @param {object} isBackNavigation
     */
  onNavigate: function(context, isBackNavigation) {
    kony.print("onNavigate start...");
    this.onInit();
  },
  /**
     * @function onInit
     * @description initialization of the form
     */
  onInit: function() {
    kony.print(this._formName + " : onInit start...");
    this.view.preShow = this.onPreShow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.bindActions();
  },
  /**
     * @function onPreShow
     * @description preShow of the form
     */
  onPreShow: function(){
    
    kony.print(this._formName + " : onPreShow start...");
    var latitude = "";
    var longitude = "";
    var self = this;
    this.view.mapNearMe.locationData = [{
        lat: "17.419805",
        lon: "78.379124",
        name: "Parshat Hills",
        desc: "Hyderabad,Telangana",
        image: "pin1.png",
        showCallout: true,
        calloutData: {
            lbl1: "KonyLabs"
        }
    }, {
        lat: "17.420962",
        lon: "78.381141",
        name: "dtdc",
        desc: "Telangana",
        image: "pin1.png",
        showCallout: true,
        calloutData: {
            lbl1: "KonyLabs"
        }
    }];
    
    
    kony.location.getCurrentPosition(function(response){
      
       latitude = response.coords.latitude;
       longitude = response.coords.longitude;   
    	var pin1 = {
        id: "id1", // id is mandatory for every pin
        lat: latitude,
        lon: longitude,
        name: "Current Location",
        image: "icon1.png",
        //focus image will be shown while map pin selected
        desc: "current location",
        showCallout: true,
        meta: {
            color: "red",
            label: "A"
        }
		};
		self.view.mapNearMe.addPin(pin1);     
   },{}, {});
    
    this.view.mapNearMe.showZoomControl = true;
    this.view.mapNearMe.screenLevelWidget = true;
    this.view.mapNearMe.enableCache = true;
    this.view.mapNearMe.zoomLevel = 16;
   //this.setOffersData();
  },
  /**
     * @function onPostShow
     * @description postShow of the form
     */
  onPostShow: function(){
    kony.print(this._formName + " : onPostShow start...");
  },
  /**
     * @function bindActions
     * @description bind action & event of the Current Form
     */
  bindActions: function() {
    kony.print(this._formName + ": bindActions start...");
    this.view.onDestroy = this.onDestroyCallback.bind(this);
  },
  /**
     * @function onDestroyCallback
     * @description callback event of onDestroy method
     */
  onDestroyCallback: function(){
    kony.print(this._formName + " : onDestroyCallback start...");
  },
  /**
   * @function onCloseView
   * @description close view and navigate to previous form
   */
  onCloseView: function() {
    try{
      kony.print(this._formName + " : onCloseView start...");
      var prevForm = kony.application.getPreviousForm();
      CommonUtil.navigateToForm(prevForm.id);
      kony.application.destroyForm(this._formName);
    }catch(exception){
      CommonUtil.logException(+ " : onCloseView", exception);
    }
  },
  
  setOffersData : function(){
   
    showDefaultLoading();
    var serviceName = "";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  "";
    var data= {};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
      { 
        // modify the returned data
        this.view.segmentOffersNearMe.setData(data);
        hideDefaultLoading();
      }
      else
      {
        hideDefaultLoading();
      }
    }
    function operationFailure(res){
      hideDefaultLoading();
      //code for failure call back
    }
  }
});