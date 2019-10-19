define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
    this.view.postShow=this.PostShow;
  },
  PreShow:function(){
    this.view.flxOffers.onClick=this.navigateToVision;
    this.view.flxTab1.onClick=this.tabOneSelected.bind(this);
    this.view.lbl11.onClick=this.tabOneSelected.bind(this);
    this.view.flxTab2.onClick=this.tabTwoSelected.bind(this);
    this.view.lbl21.onClick=this.tabTwoSelected.bind(this);
    this.view.flxTab3.onClick=this.tabThreeSelected.bind(this);
    this.view.lbl31.onClick=this.tabThreeSelected.bind(this);
    this.view.flxOffers.onClick = function(){
      commonNavigateFunction("frmOffersNearMe");
    }.bind(this);
    
  },
  navigateToVision:function(){
	commonNavigateFunction("frmCamera");
  },
  tabOneSelected:function(){
    animate(this.view.flxAnimate,{"left":"10%"},0.25,()=>{
      this.view.lbl2.skin="sknFooterInActive";
      this.view.lbl21.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterInActive";
      this.view.lbl31.skin="sknFooterInActive1";
      this.view.lbl1.skin="sknFooterActive";
      this.view.lbl11.skin="sknFooterActive1";
    });
  },
  tabTwoSelected:function(){
    animate(this.view.flxAnimate,{"left":"40%"},0.25,()=>{
      this.view.lbl1.skin="sknFooterInActive";
      this.view.lbl11.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterInActive";
      this.view.lbl31.skin="sknFooterInActive1";
      this.view.lbl2.skin="sknFooterActive";
      this.view.lbl21.skin="sknFooterActive1";
    });
  },
  tabThreeSelected:function(){
    animate(this.view.flxAnimate,{"left":"70%"},0.25,()=>{
      this.view.lbl2.skin="sknFooterInActive";
      this.view.lbl21.skin="sknFooterInActive1";
      this.view.lbl1.skin="sknFooterInActive";
      this.view.lbl11.skin="sknFooterInActive1";
      this.view.lbl3.skin="sknFooterActive";
      this.view.lbl31.skin="sknFooterActive1";});
  },
  PostShow:function(){

  },
});