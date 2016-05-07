var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _users = {};

function UserRegister(email, passwd, confm_passwd) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _users[id] = {
    id: id,
    email: email,
    passwd: passwd,
    activated: false,
    text: text
  };
}

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
  var text;

  switch(action.actionType) {
    case UserConstants.USER_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        UserStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = UserStore;
