var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  UserRegister: function(name, email, passwd) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REGISTER,
      name: name,
      email: email,
      passwd: passwd
    });

// Input: {‘email’, ‘name’, ‘password’}
// Output: {‘status’, ‘message’, ‘data’: User details including id}
    
    var registerData = {email, name, passwd}

    $.ajax({
      type: 'POST',
      data: registerData,
      url: "http://docx.8finatics.com/auth/register",
      dataType: 'json',
      cache: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
    },
      success: function(data) {
      	console.log("register ajax successful");
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_REGISTER_SUCCESS,
          showLoading: false, 
          name: name, 
          email: email, 
          registerationStatus: "Successful"
        });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_REGISTER_FAIL,
          showLoading: false, 
          errorMsg: err.toString()
        });
      }.bind(this)
    });
  },

// Input: {‘email’, ‘password’}
// Output: {‘status’, ‘message’, ‘data’: User details}

  UserLogin: function(email, passwd) {
  	AppDispatcher.dispatch({
      actionType: UserConstants.USER_LOGIN,
      email: email,
      passwd: passwd
    });

    var loginData = {email, passwd}

    $.ajax({
      type: 'POST',
      data: loginData,
      url: "http://docx.8finatics.com/auth/login",
      dataType: 'json',
      cache: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
    },
      success: function(data) {
        console.log("login ajax successful");
          AppDispatcher.dispatch({
            actionType: UserConstants.USER_LOGIN_SUCCESS,
            showLoading: false, 
            name: name, 
            email: email, 
            registerationStatus: "Successful"
          });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
          AppDispatcher.dispatch({
            actionType: UserConstants.USER_LOGIN_FAIL,
            showLoading: false, 
            errorMsg: err.toString()
          });
      }.bind(this)
    });
  }
};

module.exports = UserActions;
