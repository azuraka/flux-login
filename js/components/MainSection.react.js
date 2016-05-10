var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var Register = require('./Register.react');
var Login = require('./Login.react');
var UploadDoc = require('./UploadDoc.react');
var UserInfo = require('./UserInfo.react');
var DocumentVault = require('./DocumentVault.react');
var RequestsVault = require('./RequestsVault.react');
var AuthStore = require('../stores/AuthStore');
var UserInfoStore = require('../stores/UserInfoStore');
var AllDocumentStore = require('../stores/AllDocumentStore');
var UserStore = require('../stores/UserStore');
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
        <RequestsVault />
        <UploadDoc />
      </div>
    );
  }
});

module.exports = MainSection;
