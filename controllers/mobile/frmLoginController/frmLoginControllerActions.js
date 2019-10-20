define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onDone defined for tbxPassword **/
    AS_TextField_ae1a4162f0fd4e7ebc0588a06ce7325c: function AS_TextField_ae1a4162f0fd4e7ebc0588a06ce7325c(eventobject, changedtext) {
        var self = this;
        return self.onClickLogin.call(this);
    },
    /** onClick defined for btnlogin **/
    AS_Button_cd583a9a3e5d4833b9d87fcb771177b6: function AS_Button_cd583a9a3e5d4833b9d87fcb771177b6(eventobject) {
        var self = this;
        return self.onClickLogin.call(this);
    },
    /** postShow defined for frmLogin **/
    AS_Form_ia9cb011c78f4019af7f49144cdd6f5f: function AS_Form_ia9cb011c78f4019af7f49144cdd6f5f(eventobject) {
        var self = this;
        this.view.tbxuserName.setFocus(true);
    }
});