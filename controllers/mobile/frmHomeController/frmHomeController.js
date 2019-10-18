define({ 

 //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
    this.view.postShow=this.PostShow;
  },
  PreShow:function(){
    this.view.flxTab1.onClick=()=>{animate(this.view.flxAnimate,{"left":"10%"});};
    this.view.flxTab2.onClick=()=>{animate(this.view.flxAnimate,{"left":"40%"});};
    this.view.flxTab3.onClick=()=>{animate(this.view.flxAnimate,{"left":"70%"});};
    
  },
  PostShow:function(){
    
  },

 });