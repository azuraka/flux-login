var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_CREATE,
      text: text
    });
  },
};

module.exports = UserActions;
