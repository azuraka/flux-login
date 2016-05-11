var React = require('react');
var Register = require('./Register.react');
var Login = require('./Login.react');
var Dashboard = require('./Dashboard.react');
var UserInfo = require('./UserInfo.react');
var DocumentVault = require('./DocumentVault.react');
var RequestsVault = require('./RequestsVault.react');
var AuthStore = require('../stores/AuthStore');
var UserStore = require('../stores/SignRequestsStore');

var MainSection = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome</h1>
        <Register />
        <Login />
        <UserInfo />
        <DocumentVault />
        <Dashboard />
      </div>
    );
  }
});

module.exports = MainSection;
