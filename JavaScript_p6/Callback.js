var withoutCallback = function() {
    var data = 'data_hi_there';
    console.log('got data: ' + data);
  };
  
  withoutCallback();
  

  

var function_to_Callback_to = function(data) {
    console.log('got data: '+data);
  };
  
  var usingCallback = function(callback) {
    callback('data_hi_there_withCallback');
  };
  
  usingCallback(function_to_Callback_to);