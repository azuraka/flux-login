var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  UserRegister: function(email, passwd, confm_passwd) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REGISTER,
      text: text
    });
  },
};

module.exports = UserActions;
