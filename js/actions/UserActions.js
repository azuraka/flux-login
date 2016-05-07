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
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
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
