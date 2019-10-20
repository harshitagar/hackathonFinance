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
    var self = this;
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
    var self = this;
    showDefaultLoading();
    this.view.mapNearMe.showZoomControl = true;
    this.view.mapNearMe.screenLevelWidget = true;
    this.view.mapNearMe.enableCache = true;
    this.view.mapNearMe.zoomLevel = 16;
    //this.setOffersData();
     this.view.camera.onCapture = function(){  
      showDefaultLoading();
      self.image();
     }.bind(this);
     this.setLocationData();
     this.setCurrentLocation();
  },
  
  /**
     * @function onPostShow
     * @description postShow of the form
     */
  onPostShow: function(){
    kony.print(this._formName + " : onPostShow start...");
  },
  
  
   image : function(){
    var self=this;
    var img = this.view.camera.base64;
    var params = {
      "image":img
    };
    callService("visionAPI", params, imageReadSuccess, imageReadfail);
    function imageReadSuccess(res)
    {
//       alert(JSON.stringify(res));
      if(res.logoAnnotations.length>0 && res.logoAnnotations[0].description)
      {      
       var value = res.logoAnnotations[0].description; 
       navigateToForm("frmOffersImage", value);
      }else{
        alert("No offers available");
      }
      hideDefaultLoading();
    }
    
    function imageReadfail(res)
    {
      alert("We can't find where you are");
      hideDefaultLoading();
      commonNavigateFunction("frmOffersNearMe");
    }
  },
  
  setCurrentLocation : function(){
    var self = this;
    showDefaultLoading();
    var pin1 = {
        id: "id1", // id is mandatory for every pin
        lat: 17.447973,//gblLatitide,
        lon: 78.371173, //gblLongitude,
        name: "Current Location",
        image: "icon1.png",
        //focus image will be shown while map pin selected
        desc: "current location",
        showCallout: true,
        navigateAndZoom: true,
        meta: {
          color: "red",
          label: "A"
        }
      };
      self.view.mapNearMe.addPin(pin1); 
      hideDefaultLoading();
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
    var data= {"placeName" : "MC"};
    callService("offerByName", data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
      { 
        var input = res.offers;
        var data = [];
        input.forEach(function(offer){
          var header = {
            "lblofferPlace" : offer.placeName,
            "template": "flxOffersNearMeHeader"
          };
          data.push(header);
          var offers = offer.offers;
          offers.forEach(function(item){
            var row = {
              "lblOffer" : item,
              "template" :"flxOffersRow"
            };
            data.push(row);
          });
        });
        this.view.segmentOffersNearMe.setData(data);
        hideDefaultLoading();
      }else
      {
        alert("No Offers Available");
        hideDefaultLoading();
      }
    }
    function operationFailure(res){
      alert("No Offers Available");
      hideDefaultLoading();
      //code for failure call back
    }
  },

  setLocationData : function(lat , lon){
    var self = this;
    showDefaultLoading();
    var data = {
      "latitude" : gblLatitide,
      "longitude" : gblLongitude
    };
    callService("offerByLocation", data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
      { 
        var input = res.offers;
        // modify the returned data
        var data = [];
        var segData = [];
        var j = 0;
        input.forEach(function(offers){
          var pin1 = {
            id: "id"+ (j++), // id is mandatory for every pin
            lat: offers.latitude,
            lon: offers.longitude,
            name: offers.placeName,
            image: ".png",
            //focus image will be shown while map pin selected
            desc: "You are at "+ offers.placeName,
            showCallout: true,
            meta: {
              color: "red",
              label: "A"
            }
          };
          data.push(pin1);
          var header = {
            "lblofferPlace" : offers.placeName,
            "template": "flxOffersNearMeHeader"
          };
          segData.push(header);
          var offerValue = offers.offers;
          offerValue.forEach(function(item){
              var row = {
                "lblOffer" : item,
                "template" :"flxOffersRow"
              };
              segData.push(row);
          });
        });
        self.view.segmentOffersNearMe.setData(segData);   
        self.view.mapNearMe.addPins(data);
        hideDefaultLoading();
      }
      else
      {
        hideDefaultLoading();
        alert("NO offers Available");
      }
    }
    function operationFailure(res){
      alert("NO offers Available");
      hideDefaultLoading();
    }
  }
});