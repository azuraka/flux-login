var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';


function set_all_documents(data) {
  // name = data.name;


}


var UserInfoStore = assign({}, EventEmitter.prototype, {
  set_all_documents: function() {
    var response = {
      // name : name,
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
    case UserConstants.USER_ALL_DOCUMENTS:
      // console.log(action.response);
      set_all_documents(action.response['data']);
      UserInfoStore.emitChange();
      break;


    default:
      // no op

  }
});

module.exports = AllDocumentStore;
