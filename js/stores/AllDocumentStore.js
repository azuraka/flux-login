var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var documentList = [];

function set_all_documents(data) {
  documentList = data;
}


var AllDocumentStore = assign({}, EventEmitter.prototype, {
  get_docs_uploaded_by_me: function() {
    return documentList;
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
      set_all_documents(action.response['data']);
      AllDocumentStore.emitChange();
      break;
    default:
    
  }
});

module.exports = AllDocumentStore;
