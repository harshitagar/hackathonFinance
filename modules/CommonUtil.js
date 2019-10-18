//Type your code here
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

function navigateToOffers(){
  commonNavigateFunction("frmOffersNearMe");
}
