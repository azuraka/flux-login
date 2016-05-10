var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var error = '';

function create_error(status, errorText) {

  if (status=="error")
    error = errorText;
  else if(status=="success")
  {
    error = "Success";
  }else{
    error = "Loading ...";
  }
}


var AuthStore = assign({}, EventEmitter.prototype, {
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
    case UserConstants.USER_REGISTER_SUCCESS:
      console.log(action.response);
      create_error(action.response['status'], action.response['message']);
      AuthStore.emitChange();
      break;
    case UserConstants.USER_REGISTER_FAIL:
      console.log(action.response);
      create_error(action.response['status'], action.response['message']);
      // Do another something
      AuthStore.emitChange();
      break;
    case UserConstants.USER_REGISTER_LOADING:
      console.log(action.response);
      create_error(action.response['status'], action.response['message']);
      // Do another something
      AuthStore.emitChange();
      break;


    case UserConstants.USER_LOGIN_SUCCESS:
      create_error(action.response['status'], action.response['message']);
      // Again do something
      // console.log(action.response);
      AuthStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_FAIL:
      create_error(action.response['status'], action.response['message']);
      // Again do something
      console.log(action.response);

      AuthStore.emitChange();
      break;
    case UserConstants.USER_LOGIN_LOADING:
      // console.log(action.response);
      create_error(action.response['status'], action.response['message']);
      // Do another something
      AuthStore.emitChange();
      break;
    default:
      // no op

  }
});

module.exports = AuthStore;
