var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var transactions = [];

function set_transactions(data) {
  transactions = data;
}


var TransactionsStore = assign({}, EventEmitter.prototype, {
  get_transactions: function() {
    return transactions;
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
    case UserConstants.ALL_TRANSACTIONS:
      set_transactions(action.response['data']);
      TransactionsStore.emitChange();
      break;

    default:

  }
});

module.exports = TransactionsStore;
