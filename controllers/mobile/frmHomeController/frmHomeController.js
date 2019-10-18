define({ 

 //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
    this.view.postShow=this.PostShow;
  },
  PreShow:function(){
    this.view.flxTab1.onClick=()=>{animate(this.view.flxAnimate,{"left":"10%"},0.25,()=>{
      this.view.lbl2.skin="sknFooterInActive";
      this.view.lbl21.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterInActive";
      this.view.lbl31.skin="sknFooterInActive1";
      this.view.lbl1.skin="sknFooterActive";
      this.view.lbl11.skin="sknFooterActive1";
    });};
    this.view.flxTab2.onClick=()=>{animate(this.view.flxAnimate,{"left":"40%"},0.25,()=>{
      this.view.lbl1.skin="sknFooterInActive";
      this.view.lbl11.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterInActive";
      this.view.lbl31.skin="sknFooterInActive1";
      this.view.lbl2.skin="sknFooterActive";
      this.view.lbl21.skin="sknFooterActive1";});};
    this.view.flxTab3.onClick=()=>{animate(this.view.flxAnimate,{"left":"70%"},0.25,()=>{
      this.view.lbl2.skin="sknFooterInActive";
      this.view.lbl21.skin="sknFooterInActive1";
      this.view.lbl1.skin="sknFooterInActive";
      this.view.lbl11.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterActive";
      this.view.lbl31.skin="sknFooterActive1";});};
    
  },
  PostShow:function(){
    
  },

 });