var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var UserInfoStore = require('../stores/UserInfoStore');

var UserInfo = React.createClass({

  getInitialState: function() {
    return {display: 1, name: '', email: '', has_aadhaar: false};
  },
  componentDidMount: function() {
    UserInfoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserInfoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <h2>UserInfo</h2>
        <form>
          Name : {this.state.name}
          Email : {this.state.email}
          Aadhaar Linked : {this.state.has_aadhaar}
        </form>
      </div>
    );
  },

  _onChange: function() {
    var data = UserInfoStore.update_user();

    this.setState({
      name : data.name,
      email : data.email,
      has_aadhaar : data.has_aadhaar,
      userID : data.userID
    }
    );

  },



});

module.exports = UserInfo;
