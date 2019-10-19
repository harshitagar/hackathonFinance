var shareObj;
define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
    this.view.postShow=this.PostShow;
  },
  PreShow:function(){
    shareObj=this;
    this.view.flxAddNewGrp.centerX="150%";
    this.view.flxAddNewGrp.centerY="150%";
    this.view.flxSeg.showFadingEdges=false;
  },
  PostShow:function(){
    this.getContactsInfo();

    this.view.flxBackAddGrp.onClick=()=>{
      animate(this.view.flxAddNewGrp,{"centerX":"150%","centerY":"150%"});};

    this.view.segContacts.onRowClick=this.segSelect.bind(this);
    this.view.flxSeg.showFadingEdges=false;
    this.view.btnCreateGroup.onClick=this.servCreateGroup.bind(this);
    hideDefaultLoading();
  },
  getContactsInfo:function(){
    showDefaultLoading();
    serviceKey="getAllUsers";
    var serviceName = MFserviceList[serviceKey].serviceName;
    integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName =  MFserviceList[serviceKey].OperationName;
    var data = {};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, data, this.showContactsSuccess, this.showContactsFail);
  },
  segSelect:function(){
    var data=this.view.segContacts.data;
    var slectedRow=this.view.segContacts.selectedRowIndex[1]+"";
    data[parseInt(slectedRow)].lblCheck.isVisible=true;
    this.view.segContacts.setDataAt( data[parseInt(slectedRow)], parseInt(slectedRow), 0);
  },
  showContactsSuccess:function(response){
    this.view.segContacts.removeAll();
    //animate(this.view.flxAddNewGrp,{"centerX":"50%","centerY":"50%"});
    // alert(response.Users);
    var contactsData=[];
    var tempData={};
    for (let i=0;i<response.Users.length;i++){
      tempData={
        "lblName":{text: response.Users[i].username},
        "lblCheck":{text: "", isVisible: false},
      };
      contactsData.push(tempData);
    }
    //alert(contactsData);
    this.view.segContacts.setData(contactsData);
    hideDefaultLoading();
    this.view.flxAdd.onClick=()=>{animate(this.view.flxAddNewGrp,{"centerX":"50%","centerY":"50%"});};
    //  this.view.segContacts.removeAll();

  },
  showContactsFail:function(error){
    alert("Service Failed. Please try again later: "+error);
  },
  servCreateGroup:function(){
    let data=this.view.segContacts.data;
    //alert(data);
    let memberNames="";
    for (let i=0;i<data.length;i++){
      if(data[i].lblCheck.isVisible){
        memberNames+=data[i].lblName.text+"~";
      }
    }
    let membersNames=memberNames.substring(0,memberNames.length-1);
    if(this.view.txtGrpName.text===null||this.view.txtGrpName.text===undefined||memberNames.length<2||gblUserName===""){
      alert("Please enter Group Name and select group members(It least more than one)");
    }
    else{
      showDefaultLoading();
      var servData={
        "username": gblUserName,
        "memberNames" : membersNames,
        "groupName" : this.view.txtGrpName.text
      };
      callService("createNewGroup",servData,(response)=>{
        animate(this.view.flxAddNewGrp,{"centerX":"150%","centerY":"150%"},0.25,()=>{hideDefaultLoading();});
        this.view.txtGrpName.text="";
        this.view.segContacts.removeAll();
        this.getContactsInfo();
      },(error)=>{
        alert("Service Failed. Please try again later.");
      });
    }
  },




});