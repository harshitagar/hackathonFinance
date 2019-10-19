define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
    this.view.postShow=this.PostShow;
  },
  PreShow:function(){
   // this.view.segContacts.setData(contactsData);
    this.view.flxAddNewGrp.centerX="150%";
    this.view.flxAddNewGrp.centerY="150%";
     this.view.flxSeg.showFadingEdges=false;
  },
  PostShow:function(){
    this.view.flxAdd.onClick=()=>{
      animate(this.view.flxAddNewGrp,{"centerX":"50%","centerY":"50%"});};
    this.view.flxBackAddGrp.onClick=()=>{
      animate(this.view.flxAddNewGrp,{"centerX":"150%","centerY":"150%"});};
    
    this.view.segContacts.onRowClick=this.segSelect.bind(this);
    this.view.flxSeg.showFadingEdges=false;
  },
  segSelect:function(){
    var data=this.view.segContacts.selectedRowItems;
    alert(data);
    //var slectedRow=this.view.segContacts.selectedRowIndex[1]+"";
//     data.lblCheck.text="";
//     data.lblCheck.isVisible=true;
//     this.view.segContacts.setDataAt(data, slectedRow, 0);
//     alert(data);
  },


});