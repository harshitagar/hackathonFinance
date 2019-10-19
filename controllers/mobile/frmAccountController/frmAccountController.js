define({
  _formName : "frmAccount",
  /**
     * @function onNavigate
     * @description default buildin method onNavigate called from navigate API
	 * @param {object} context
	 * @param {object} isBackNavigation
     */
  onNavigate: function(context, isBackNavigation) {
    this.onInit();
  },
  /**
     * @function onInit
     * @description initialization of the form
     */
  onInit: function() {
    this.view.preShow = this.onPreShow.bind(this);
    this.view.postShow = this.onPostShow.bind(this);
    this.bindActions();
  },
  /**
     * @function onPreShow
     * @description preShow of the form
     */
  onPreShow: function(){
    this.profileData();
    this.setTrasactionsData();
  },
  /**
     * @function onPostShow
     * @description postShow of the form
     */
  onPostShow: function(){

  },
  /**
     * @function bindActions
     * @description bind action & event of the Current Form
     */
  bindActions: function() {
    this.view.btnBack.onClick = this.onCloseView.bind(this);   
  },
  
  /**
   * @function onCloseView
   * @description close view and navigate to previous form
   */
  onCloseView: function() {
    try{
      var prevForm = kony.application.getPreviousForm();
      CommonUtil.navigateToForm(prevForm.id);
      kony.application.destroyForm(this._formName);
    }catch(exception){
      CommonUtil.logException(+ " : onCloseView", exception);
    }
  },
  
  profileData : function(){
    // call the integraton service
    var serviceName = "";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  "";
    var data= {};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
      {  
        this.view.profile.src = "";
        this.view.profile.RemainingBalance = "";
        this.view.profile.UserName = "";
        this.view.profile.AccountNumber = "";
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
  },

  setTrasactionsData : function(){
    // call the integration service
     var serviceName = "";
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  "";
    var input= {};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, input, operationSuccess, operationFailure);
    function operationSuccess(res){
      if(res.success)
      {  
        this.view.profile.src = "";
        this.view.profile.RemainingBalance = "";
        this.view.profile.UserName = "";
        this.view.profile.AccountNumber = "";
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
    this.view.segTransaction.setData(data);
  }
});