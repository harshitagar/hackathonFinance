define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxTab3 **/
    AS_FlexContainer_eb633951b2f34a22a4e160ff7ef7be80: function AS_FlexContainer_eb633951b2f34a22a4e160ff7ef7be80(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmOffersNearMe");
        ntf.navigate();
    },
    /** onClick defined for flxShare **/
    AS_FlexContainer_ec14bd76c9eb47e5b8822cd42972a415: function AS_FlexContainer_ec14bd76c9eb47e5b8822cd42972a415(eventobject) {
        var self = this;
        commonNavigateFunction.call(this, "frmShare");
        showDefaultLoading();
    }
});