define("userHomeController", {
    _formName: "frmName",
    /**
     * @function onNavigate
     * @description default buildin method onNavigate called from navigate API
     * @param {object} context
     * @param {object} isBackNavigation
     */
    onNavigate: function(context, isBackNavigation) {
        kony.print("onNavigate start...");
        this.context = context;
        this.onInit();
    },
    /**
     * @function onInit
     * @description initialization of the form
     */
    onInit: function() {
        kony.print(this._formName + " : onInit start...");
        this.view.preShow = this.onPreShow.bind(this);
        this.view.postShow = this.onPostShow.bind(this);
        this.bindActions();
    },
    /**
     * @function onPreShow
     * @description preShow of the form
     */
    onPreShow: function() {
        kony.print(this._formName + " : onPreShow start...");
    },
    /**
     * @function onPostShow
     * @description postShow of the form
     */
    onPostShow: function() {
        kony.print(this._formName + " : onPostShow start...");
    },
    /**
     * @function bindActions
     * @description bind action & event of the Current Form
     */
    bindActions: function() {
        kony.print(this._formName + ": bindActions start...");
        this.view.onDestroy = this.onDestroyCallback.bind(this);
        this.view.btnBack.onClick = this.onCloseView.bind(this);
        this.view.btnSubmit.onClick = this.onClickSubmit.bind(this);
    },
    /**
     * @function onDestroyCallback
     * @description callback event of onDestroy method
     */
    onDestroyCallback: function() {
        kony.print(this._formName + " : onDestroyCallback start...");
    },
    /**
     * @function onCloseView
     * @description close view and navigate to previous form
     */
    onCloseView: function() {
        try {
            kony.print(this._formName + " : onCloseView start...");
            var prevForm = kony.application.getPreviousForm();
            CommonUtil.navigateToForm(prevForm.id);
            kony.application.destroyForm(this._formName);
        } catch (exception) {
            CommonUtil.logException(+" : onCloseView", exception);
        }
    },
});
define("HomeControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("HomeController", ["userHomeController", "HomeControllerActions"], function() {
    var controller = require("userHomeController");
    var controllerActions = ["HomeControllerActions"];
    return kony.visualizer.mixinControllerActions(controller, controllerActions);
});
