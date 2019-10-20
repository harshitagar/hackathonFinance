define({
  _formName : "frmOffersImage",
  _placeName : "", 
  /**
     * @function onNavigate
     * @description default buildin method onNavigate called from navigate API
	 * @param {object} context
	 * @param {object} isBackNavigation
     */
  onNavigate: function(context, isBackNavigation) {
    kony.print("onNavigate start...");
    this.view.lblOffersplace.text = context;
    this._placeName = context;
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
    var self = this;
    this.setOffersData();
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
      navigateToForm(prevForm.id);
      kony.application.destroyForm(this._formName);
    }catch(exception){
      CommonUtil.logException(+ " : onCloseView", exception);
    }
  },

  setOffersData : function(value){
    showDefaultLoading();
    var self = this;
    var data = {"placeName" : (this._placeName).substring(0,4)};
    callService("offerByName", data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res)
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

        self.view.segmentOffersNearMe.setData(data);
        self.view.segmentOffersNearMe.setVisibility(true);
        self.view.flxNoOffer.setVisibility(false);
        hideDefaultLoading();
      }else{
        this.view.segmentOffersNearMe.setVisibility(false);
        this.view.flxNoOffer.setVisibility(true);
      }
    }

    function operationFailure(res){
      alert("No Offers Available");
      hideDefaultLoading();
      this.view.segmentOffersNearMe.setVisibility(false);
      this.view.flxNoOffer.setVisibility(true);
    }
  },
});