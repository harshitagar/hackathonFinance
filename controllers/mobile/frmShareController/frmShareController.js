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
    this.getGroupInfo();
    this.view.lblUserName.text = gblUserName;
    this.view.flxBackAddGrp.onClick=()=>{
      animate(this.view.flxAddNewGrp,{"centerX":"150%","centerY":"150%"});};

    this.view.segContacts.onRowClick=this.segSelect.bind(this);
    
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
  getGroupInfo : function(){
    var params = {
      username : gblUserName
    };
    callService("showGroupsForUser", params, this.getGroupInfoSuccessCallback, this.showContactsFail);
  },
  getGroupInfoSuccessCallback : function(res){
    var params = {
      username : gblUserName
    };
    callService("getAllTransForUser", params, this.getAllTransForUserSuccessCallback.bind(this,res.Groups), this.showContactsFail);
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
    hideDefaultLoading();
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
  getSegData : function(transactions, groupName){
    var data = [];
    grpTotal = 0;
    for(var i=0; i<transactions.length; i++){
      var transaction = transactions[i];
      if(transaction.groupName == groupName){
        grpTotal += transaction.amount;
        data.push({
          "lblCheck": "",
          "lblName" : transaction.transactionName
        });
      }
    }
    return data;
  },
  getAllTransForUserSuccessCallback : function(groups, res){
    var transactions = res.Transactions;
    for(var i=0; i<groups.length; i++){
      var groupName = groups[i].groupName;
      var usersName = groups[i].usersName;
      var segData = this.getSegData(transactions,groupName);
      var grpFlx = this.getGroupFlx(i,groupName , usersName.length, "Total Spent: "+grpTotal, segData);
      this.view.flxBody.add(grpFlx);
    }
    hideDefaultLoading();
  },
  getGroupFlx : function(index, groupName, numberOfMembers, totalMeanValue, segData){
    var flx1 = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "clipBounds": true,
      "height": "100%",
      "id": "flx"+index,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0dp",
      "isModalContainer": false,
      "skin": "slFbox",
      "top": "0dp",
      "width": "100%",
      "zIndex": 1
    }, {}, {});
    flx1.setDefaultUnit(kony.flex.DP);
    var flxGrp1 = new kony.ui.FlexScrollContainer({
      "allowHorizontalBounce": false,
      "allowVerticalBounce": true,
      "bounces": true,
      "centerX": "50%",
      "centerY": "50%",
      "clipBounds": true,
      "enableScrolling": true,
      "height": "90%",
      "horizontalScrollIndicator": true,
      "id": "flxGrp"+index,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "pagingEnabled": false,
      "scrollDirection": kony.flex.SCROLL_VERTICAL,
      "skin": "sknGrp",
      "verticalScrollIndicator": false,
      "width": "90%",
      "zIndex": 1
    }, {}, {});
    flxGrp1.setDefaultUnit(kony.flex.DP);
    var flxGrpTop = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerX": "50%",
      "clipBounds": true,
      "height": "30%",
      "id": "flxGrpTop"+index,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "isModalContainer": false,
      "skin": "slFbox",
      "top": "0dp",
      "width": "100%",
      "zIndex": 1
    }, {}, {});
    flxGrpTop.setDefaultUnit(kony.flex.DP);
    var flxImg = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerY": "50%",
      "clipBounds": true,
      "height": "100dp",
      "id": "flxImg"+index,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "8%",
      "isModalContainer": false,
      "skin": "CopyslFbox0adf20f21622640",
      "top": "63dp",
      "width": "100dp",
      "zIndex": 1
    }, {}, {});
    flxImg.setDefaultUnit(kony.flex.DP);
    var imgGroupIcon = new kony.ui.Image2({
      "centerX": "50%",
      "centerY": "50%",
      "height": "100%",
      "id": "imgGroupIcon"+index,
      "isVisible": true,
      "skin": "slImage",
      "src": "groupicon.png",
      "width": "100%",
      "zIndex": 1
    }, {
      "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    flxImg.add(imgGroupIcon);
    var flxInfo = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerY": "50%",
      "clipBounds": true,
      "height": "120dp",
      "id": "flxInfo"+index,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "50%",
      "isModalContainer": false,
      "skin": "slFbox",
      "top": "37dp",
      "width": "45%",
      "zIndex": 1
    }, {}, {});
    flxInfo.setDefaultUnit(kony.flex.DP);
    var lblGrpName = new kony.ui.Label({
      "id": "lblGrpName"+index,
      "isVisible": true,
      "left": "0dp",
      "skin": "sknLblPrimary",
      "text": groupName,
      "textStyle": {
        "letterSpacing": 0,
        "strikeThrough": false
      },
      "top": "15dp",
      "width": kony.flex.USE_PREFFERED_SIZE,
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {
      "textCopyable": false
    });
    var lblGrpMembers = new kony.ui.Label({
      "id": "lblGrpMembers"+index,
      "isVisible": true,
      "left": "1dp",
      "skin": "sknLblSecondary",
      "text": "Members: "+numberOfMembers,
      "textStyle": {
        "letterSpacing": 0,
        "strikeThrough": false
      },
      "top": "50dp",
      "width": kony.flex.USE_PREFFERED_SIZE,
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {
      "textCopyable": false
    });
    var lblGrpBalance = new kony.ui.Label({
      "id": "lblGrpBalance"+index,
      "isVisible": true,
      "left": "1dp",
      "skin": "sknLblSecondary",
      "text": totalMeanValue,
      "textStyle": {
        "letterSpacing": 0,
        "strikeThrough": false
      },
      "top": "80dp",
      "width": kony.flex.USE_PREFFERED_SIZE,
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {
      "textCopyable": false
    });
    flxInfo.add(lblGrpName, lblGrpMembers, lblGrpBalance);
    var flxLine = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "bottom": "0dp",
      "clipBounds": true,
      "height": "1dp",
      "id": "flxLine"+index,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0dp",
      "isModalContainer": false,
      "skin": "sknSeperator",
      "width": "100%",
      "zIndex": 1
    }, {}, {});
    flxLine.setDefaultUnit(kony.flex.DP);
    flxLine.add();
    flxGrpTop.add(flxImg, flxInfo, flxLine);
    var flxTransHistory = new kony.ui.FlexScrollContainer({
      "allowHorizontalBounce": false,
      "allowVerticalBounce": true,
      "bounces": true,
      "centerX": "50%",
      "clipBounds": true,
      "enableScrolling": true,
      "height": "68%",
      "horizontalScrollIndicator": true,
      "id": "flxTransHistory"+index,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "9dp",
      "pagingEnabled": false,
      "scrollDirection": kony.flex.SCROLL_VERTICAL,
      "skin": "CopyslFSbox0b3083611992b48",
      "top": "30%",
      "verticalScrollIndicator": false,
      "width": "90%",
      "zIndex": 1
    }, {}, {});
    flxTransHistory.setDefaultUnit(kony.flex.DP);
    kony.mvc.registry.add('tmpTransaction', 'tmpTransaction', 'tmpTransactionController');
    var segTransaction = new kony.ui.SegmentedUI2({
      "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
      "centerX": "50%",
      "data": segData,
      "groupCells": false,
      "id": "segTransaction"+index,
      "isVisible": true,
      "left": "0dp",
      "needPageIndicator": true,
      "pageOffDotImage": "pageoffdot.png",
      "pageOnDotImage": "pageondot.png",
      "retainSelection": false,
      "rowFocusSkin": "seg2Normal",
      "rowSkin": "seg2Normal",
      "rowTemplate": "flxTransaction",
      "scrollingEvents": {},
      "sectionHeaderSkin": "sliPhoneSegmentHeader",
      "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
      "separatorRequired": false,
      "showScrollbars": false,
      "top": "0%",
      "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
      "widgetDataMap": {
        "lblName": "lblName"
      },
      "width": "100%",
      "zIndex": 1
    }, {
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    flxTransHistory.add(segTransaction);
    flxGrp1.add(flxGrpTop, flxTransHistory);
    flx1.add(flxGrp1);
    return flx1;
  }
});