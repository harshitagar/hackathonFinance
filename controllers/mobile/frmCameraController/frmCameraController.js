define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
  },
  PreShow:function(){
    this.view.btnOffers.text = "See All Offers Instead";
    this.view.lblStoreName.text ="";
    this.view.camera.onCapture=this.img.bind(this);
  },
  navigateToAllOffers:function(){
    commonNavigateFunction("frmOffersNearMe");
  },
  
  img:function(){
    var self=this;
    showDefaultLoading();
    var img = this.view.camera.base64;
    //     this.view.img.base64=img;
    var params = {
      "image":img
    };
    callService("visionAPI", params, imageReadSuccess, imageReadfail);
    function imageReadSuccess(res)
    {
      hideDefaultLoading();
      if(res.logoAnnotations.length>0 && res.logoAnnotations[0].description)
      {
       var value = res.logoAnnotations[0].description; 
       navigateToForm("frmOffersImage", value);
      }
    }
    
    function imageReadfail(res)
    {
      hideDefaultLoading();
      commonNavigateFunction("frmOffersNearMe");
    }
  },
});
