define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
  },
  PreShow:function(){
    this.view.camera.onCapture=this.img.bind(this);
  },
  img:function(){
    showDefaultLoading();
    var img = this.view.camera.base64;
    this.view.img.base64=img;
    var params = {
      "image":img
    };
    callService("visionAPI", params, imageReadSuccess, imageReadfail);
    function imageReadSuccess(res)
    {
      hideDefaultLoading();
      if(res.logoAnnotations.length>0 && res.logoAnnotations[0].description)
        alert("You are at "+res.logoAnnotations[0].description+"!"+"\nLet's find offers for you!!");
      else
        alert("We can't find where you are!\nTake a look at nearby Offers");
    }
    function imageReadfail(res)
    {
      hideDefaultLoading();
      alert("We can't find where you are!\nTake a look at nearby Offers");
    }
  },
});
