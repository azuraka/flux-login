var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var statusReg = '';
var statusLog = '';
var authDisplay = 1;
var uploadDocDisplay = 0;

function create_status_reg(message) {
  statusReg = message;
}

function create_status_log(message) {
  statusLog = message;
}

function set_auth_display() {
  authDisplay = 0;
  uploadDocDisplay = 1;
}

var AuthStore = assign({}, EventEmitter.prototype, {
  statusMsgReg: function() {
    return statusReg;
  },

  statusMsgLog: function() {
    return statusLog;
  },

  authDisplay: function() {
    return authDisplay;
  },

  uploadDocDisplay: function() {
    console.log(uploadDocDisplay + "asdfg");
    return uploadDocDisplay;
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

    case UserConstants.USER_REGISTER_LOADING:
      create_status_reg(action.response);
      AuthStore.emitChange();
      break;
    case UserConstants.USER_REGISTER_SUCCESS:
      create_status_reg(action.response);
      AuthStore.emitChange();
      break;
    case UserConstants.USER_REGISTER_FAIL:
      create_status_reg(action.response);
      AuthStore.emitChange();
      break;
    
    case UserConstants.USER_LOGIN_LOADING:
      create_status_log(action.response);
      AuthStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_SUCCESS:
      create_status_log(action.response);
      set_auth_display();
      AuthStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_FAIL:
      create_status_log(action.response);
      AuthStore.emitChange();
      break;
    
    default:
      // no op

  }
});

module.exports = AuthStore;
