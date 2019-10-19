define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
  },
  PreShow:function(){
    this.view.btnOffers.text = "See All Offers Instead";
    this.view.btnOffers.onClick = this.navigateToAllOffers;
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
        self.view.lblStoreName.text = "You are at "+res.logoAnnotations[0].description+"!"+"\nLet's find offers for you!!";
        self.view.btnOffers.text = res.logoAnnotations[0].description+" Offers";
      }
      else
      {
        self.view.lblStoreName.text = "We can't find where you are!\nTake a look at nearby Offers!";
        self.view.btnOffers.text = "See All Offers Instead";
      }
    }
    
    function imageReadfail(res)
    {
      hideDefaultLoading();
      self.view.lblStoreName.text = "We can't find where you are!\nTake a look at nearby Offers!";
      self.view.btnOffers.text = "See All Offers Instead";
    }
  },
});
