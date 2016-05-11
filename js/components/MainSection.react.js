var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var Register = require('./Register.react');
var Login = require('./Login.react');
var Dashboard = require('./Dashboard.react');
var UserInfo = require('./UserInfo.react');
var AllDocumentStore = require('../stores/AllDocumentStore');
var DocumentVault = require('./DocumentVault.react');
var RequestsVault = require('./RequestsVault.react');
var ProfileInfo = require('./ProfileInfo.react');

var AuthStore = require('../stores/AuthStore');
var UserInfoStore = require('../stores/UserInfoStore');

var UserStore = require('../stores/UserStore');
var SignRequestsStore = require('../stores/SignRequestsStore');

var MainSection = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome</h1>
        <Register />
        <Login />
        <ProfileInfo />
        <UserInfo />
        <DocumentVault />
        <RequestsVault />
        <Dashboard />
      </div>
    );
  }
});

module.exports = MainSection;
