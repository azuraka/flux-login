var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RequestsConstants = require('../constants/RequestsConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var requests_pending_on_others = [];
var requests_completed = [];
var requests_pending_on_me = [];

function set_requests_pending_on_others(data) {
  requests_pending_on_others = data;
}
function set_requests_pending_on_me(data) {
  requests_pending_on_me = data;
}
function set_requests_completed(data) {
  requests_completed = data;
}

var SignRequestsStore = assign({}, EventEmitter.prototype, {
  get_requests_pending_on_others: function() {
    return requests_pending_on_others;
  },
  get_requests_pending_on_me: function() {
    return requests_pending_on_me;
  },
  get_requests_completed: function() {
    return requests_completed;
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
    case RequestsConstants.REQUESTS_PENDING_ON_OTHERS:
      set_requests_pending_on_others(action.response['data']);
      SignRequestsStore.emitChange();
      break;
    case RequestsConstants.REQUESTS_PENDING_ON_ME:
      set_requests_pending_on_me(action.response['data']);
      SignRequestsStore.emitChange();
      break;
    case RequestsConstants.REQUESTS_COMPLETED:
      set_requests_completed(action.response['data']);
      SignRequestsStore.emitChange();
      break;
    default:

  }
});

module.exports = SignRequestsStore;
