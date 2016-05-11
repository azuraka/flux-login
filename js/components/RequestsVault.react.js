var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var SignRequestsStore = require('../stores/SignRequestsStore');
var RequestList = require('./RequestList.react');

var RequestsVault = React.createClass({

  getInitialState: function() {
    return {
      display: 0,
      requests_pending_on_others : [],
      requests_pending_on_me :[],
      requests_completed :[]
    }
  },

  componentDidMount: function() {
    SignRequestsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SignRequestsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if(this.state.display){
      return (
        <div>
          <h4>Pending On Others</h4>
            <RequestList requests={this.state.requests_pending_on_others} />
          <h4>Requests Pending on Me</h4>
            <RequestList requests={this.state.requests_pending_on_me} />
          <h4>Completed Requests</h4>
            <RequestList requests={this.state.requests_completed} />
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },

  _onChange: function() {
    var requests_pending_on_others = SignRequestsStore.get_requests_pending_on_others();
    var requests_pending_on_me = SignRequestsStore.get_requests_pending_on_me();
    var requests_completed = SignRequestsStore.get_requests_completed();

    this.setState({
      requests_pending_on_others : requests_pending_on_others,
      requests_pending_on_me : requests_pending_on_me,
      requests_completed : requests_completed
    });
  },



});

module.exports = RequestsVault;
