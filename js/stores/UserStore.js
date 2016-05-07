var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var UserStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case UserConstants.USER_REGISTER:
      // Do something
      break;
    case UserConstants.USER_REGISTER_SUCCESS:
      console.log("User Register Recieved at Store (Success)");
      break;
    case UserConstants.USER_REGISTER_FAIL:
      console.log("User Register Recieved at Store (Fail)");
      // Do another something
      break;
    case UserConstants.USER_LOGIN:
      // Again do something
      break;
    default:
      // no op

  }
});

module.exports = UserStore;
