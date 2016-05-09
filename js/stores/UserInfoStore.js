var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var name = "";
var email = "";
var has_aadhaar = false;
var userID = "";

function update_user(data) {
  name = data.name;
  email = data.email;
  has_aadhaar = data.has_aadhaar;
  userID = data.id;
}


var UserInfoStore = assign({}, EventEmitter.prototype, {
  update_user: function() {
    var response = {
      name : name,
      email : email,
      has_aadhaar : has_aadhaar,
      userID : userID
    }
    return response;
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
    case UserConstants.USER_INFO:
      console.log(action.response);
      update_user(action.response['data']);
      UserInfoStore.emitChange();
      break;


    default:
      // no op

  }
});

module.exports = UserInfoStore;
