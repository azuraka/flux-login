var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var UserStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case UserConstants.USER_REGISTER:
      // Do something
      UserStore.emitChange();
      break;
    case UserConstants.USER_REGISTER_SUCCESS:
      console.log("User Register Recieved at Store (Success)");
      UserStore.emitChange();
      break;
    case UserConstants.USER_REGISTER_FAIL:
      console.log("User Register Recieved at Store (Fail)");
      // Do another something
      UserStore.emitChange();
      break;
    case UserConstants.USER_LOGIN:
      // Again do something
      UserStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_SUCCESS:
      // Again do something
      UserStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_FAIL:
      // Again do something
      UserStore.emitChange();
      break;
    default:
      // no op

  }
});

module.exports = UserStore;
