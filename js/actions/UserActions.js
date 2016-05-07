var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  UserRegister: function(email, passwd, confm_passwd) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REGISTER,
      email: email,
      passwd: passwd,
      confm_passwd: confm_passwd
    });


// Input
// Input: {‘email’, ‘name’, ‘password’}
// Output: {‘status’, ‘message’, ‘data’: User details including id}

    $.ajax({
      type: 'POST',
      url: "http://docx.8finatics.com/auth/register",
      dataType: 'json',
      cache: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
    },
      success: function(data) {
      	console.log("register ajax successful")
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  UserLogin: function(email, passwd) {
  	AppDispatcher.dispatch({
      actionType: UserConstants.USER_LOGIN,
      text: text
    });
  }
};

module.exports = UserActions;
