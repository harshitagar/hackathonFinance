var shareObj;
define({ 

  //Type your controller code here 
  onNavigate:function(){
    this.view.preShow=this.PreShow;
    this.view.postShow=this.PostShow;
  },
  PreShow:function(){
    shareObj=this;
    this.getAllMembers();
    this.view.flxSelMembers.onClick = this.getAllMembers;
    this.view.flxSelGroups.onClick = this.getAllGroups;
    this.view.segContacts.onRowClick = this.segSelect;
    this.view.btnCreateTrans.onClick = this.onDoneTransaction;
  },
  PostShow:function(){
  },
  onDoneTransaction:function(){
    var data=this.view.segContacts.data;
    var memberNames="";
    var groupName = "";
    if(this.view.flxSelMembers.skin == "CopyflxInfoVision0g85964711e034e")
    {
      for (let i=0;i<data.length;i++){
        if(data[i].lblCheck.isVisible){
          memberNames+=data[i].lblName+"~";
        }
      }
    }
    else{
      for (let i=0;i<data.length;i++){
        if(data[i].lblCheck.isVisible){
          memberNames+=data[i].members;
          groupName = data[i].lblName;
          break;
        }
      }
    }
    memberNames = memberNames.substring(0,memberNames.length-1);
    var params = {
		"username"		  :	gblUserName,
		"transactionName" : this.view.tbxTransactionName,
        "transactionType" : this.view.tbxTransType,
        "memberNames"     : memberNames,
        "amount"          : this.view.txtAmount,
        "payeeUserName"   : gblUserName,
        "groupName"       : groupName,
        "memberNumbers"	  : "8572014047~8960752539"
	};
    alert(params);
  },
  segSelect:function(){
    var data=this.view.segContacts.data;
    var slectedRow=this.view.segContacts.selectedRowIndex[1]+"";
    data[parseInt(slectedRow)].lblCheck.isVisible=!data[parseInt(slectedRow)].lblCheck.isVisible;
    this.view.segContacts.setDataAt( data[parseInt(slectedRow)], parseInt(slectedRow), 0);
  },
  segSelectGroup:function(){
    var data=this.view.segContacts.data;
    var slectedRow=this.view.segContacts.selectedRowIndex[1]+"";
    for(var i=0;i<data.length;i++)
      data[i].lblCheck.isVisible=false;
    data[parseInt(slectedRow)].lblCheck.isVisible=true;
    this.view.segContacts.setData(data);
  },
  getAllMembers : function(){
    showDefaultLoading();
    this.view.segContacts.onRowClick = this.segSelect;
    this.view.flxSelMembers.skin = "CopyflxInfoVision0g85964711e034e";
    this.view.flxSelGroups.skin = "CopyslFbox0f989fabee6564b";
    var self = this;
    var members = [];
    var params = {"username":gblUserName};
    callService("getAllUsers", params, allMembersSuccessCall, allMembersFailureCall);
    function allMembersSuccessCall(res){
      var userData = res.Users;
      for(var i=0;i<userData.length;i++)
      {
        userDataVal = userData[i];
        var temp = {"lblName":userDataVal.username,"lblCheck":{text: "", isVisible: false}};
        members.push(temp);
      }
      self.view.segContacts.setData(members);
      hideDefaultLoading();
    }
    function allMembersFailureCall(res){
      hideDefaultLoading();
    }
  },
  getAllGroups : function(){
    showDefaultLoading();
    this.view.segContacts.onRowClick = this.segSelectGroup;
    this.view.flxSelGroups.skin = "CopyflxInfoVision0g85964711e034e";
    this.view.flxSelMembers.skin = "CopyslFbox0f989fabee6564b";
    var self = this;
    var members = [];
    var params = {"username":gblUserName};
    callService("showGroupsForUser", params, allGroupsSuccessCall, allGroupsFailureCall);
    function allGroupsSuccessCall(res){
      var groupData = res.Groups;
      for(var i=0;i<groupData.length;i++)
      {
        groupDataVal = groupData[i];
        var groupMemString = "";
        for(var k=0;k<groupDataVal.usersName.length;k++)
        {
          groupMemString=groupMemString+groupDataVal.usersName[k]+"~";
        }
        var temp = {"lblName":groupDataVal.groupName,"members":groupMemString,"lblCheck":{text: "", isVisible: false}};
        members.push(temp);
      }
      self.view.segContacts.setData(members);
      hideDefaultLoading();
    }
    function allGroupsFailureCall(res){
      hideDefaultLoading();
    }
  }

});