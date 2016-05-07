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


// Input
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
      	console.log("register ajax successful")
        //this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  // Input: {‘email’, ‘password’}
  // 	Output: {‘status’, ‘message’, ‘data’: User details}

  UserLogin: function(email, passwd) {


      AppDispatcher.dispatch({
        actionType: UserConstants.USER_LOGIN,
        text: text
      });

        $.ajax({
          type: 'POST',
          url: "http://docx.8finatics.com/auth/login",
          dataType: 'json',
          cache: false,
          headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
          success: function(data) {
          	console.log("login ajax successful")
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

  }
};

module.exports = UserActions;
