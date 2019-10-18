define({ 

 //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
  },
  PreShow:function(){
    this.view.camera.onCapture=this.img.bind(this);
  },
  img:function(){
    var img= this.view.camera.rawBytes;
    this.view.img.rawBytes=img;
  },
 });
