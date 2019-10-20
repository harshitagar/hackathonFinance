define({ 

  //Type your controller code here 
  onNavigate:function(img){
    if(img){
      alert("image captured");
    }
    this.view.preShow=this.PreShow(img);
  },
  PreShow:function(img){
    this.img(img);
  },
 
  img:function(img){
    var self=this;
    showDefaultLoading();
    //     this.view.img.base64=img;
    var params = {
      "image":img
    };
    callService("visionAPI", params, imageReadSuccess, imageReadfail);
    function imageReadSuccess(res)
    {
      if(res.logoAnnotations.length>0 && res.logoAnnotations[0].description)
      {
       var value = res.logoAnnotations[0].description; 
       navigateToForm("frmOffersImage", value);
      }else{
        alert("No offers available");
        commonNavigateFunction("frmOffersNearMe");
      }
    }
    
    function imageReadfail(res)
    {
      alert("NO offers available");
      commonNavigateFunction("frmOffersNearMe");
    }
  },
});
