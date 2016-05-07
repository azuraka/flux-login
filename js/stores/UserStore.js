var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var error = '';

function create_error(errorText) {
  error = errorText;
}

var UserStore = assign({}, EventEmitter.prototype, {
  errorMsg: function() {
    return error;
  },

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
      console.log(action.response);
      create_error(action.response['message']);
      UserStore.emitChange();
      break;
    case UserConstants.USER_REGISTER_FAIL:
      console.log(action.response);
      // Do another something
      UserStore.emitChange();
      break;
    case UserConstants.USER_LOGIN:
      // Again do something
      UserStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_SUCCESS:
      // Again do something
      console.log(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_FAIL:
      // Again do something
      console.log(action.response);
      UserStore.emitChange();
      break;
    default:
      // no op

  }
});

module.exports = UserStore;
