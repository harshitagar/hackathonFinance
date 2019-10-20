//Type your code here
gblUserName= "";
gblLatitide = "";
gblLongitude = "";

function animate( element, params, duration, callback, delay ){
  duration = duration || 0.25;
  callback = callback || null;
  delay = delay || 0;
  params.stepConfig = {
    "timingFunction": kony.anim.EASE
  };
  element.animate(
    kony.ui.createAnimation({
      "100": params,
    }), {
      "delay": delay,
      "iterationCount": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration": duration
    }, {
      "animationEnd": callback
    });
}
function commonNavigateFunction(frmName){
  var ntf = new kony.mvc.Navigation(frmName);
  ntf.navigate();
}
  /**
   * @function navigateToForm
   * @param formName 
   */
  function navigateToForm(formName,param){
    if(kony.sdk.getChannelType() === 'desktop'){
      formName = "web" + formName;
    }
    var frmNavigation = new kony.mvc.Navigation(formName);
    if(param){
      frmNavigation.navigate(param);
    }else{
      frmNavigation.navigate();
    }
  }

function showDefaultLoading (){
  kony.application.showLoadingScreen("sknFlxLoading","Loading...",
                                     constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
                                     true,
                                     true,
                                     null);
}
function hideDefaultLoading(){
  kony.application.dismissLoadingScreen();
}