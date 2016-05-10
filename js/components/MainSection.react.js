var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var Register = require('./Register.react');
var Login = require('./Login.react');
var UploadDoc = require('./UploadDoc.react');
var UserInfo = require('./UserInfo.react');
var DocumentVault = require('./DocumentVault.react');
var AuthStore = require('../stores/AuthStore');
var UserInfoStore = require('../stores/UserInfoStore');
var AllDocumentStore = require('../stores/AllDocumentStore');
var UserStore = require('../stores/UserStore');

var MainSection = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange2);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange2);
  },

  render: function() {
    return (
      <div>
        <h1>Welcome</h1>
        <Register />
        <Login />
        <UserInfo />
        <DocumentVault />
        <UploadDoc />
      </div>
    );
  },

  _onChange2: function() {
  }
});

module.exports = MainSection;
