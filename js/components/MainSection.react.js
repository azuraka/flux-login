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

function seterror(){
  return{
    error: AuthStore.errorMsg()
  };
}

var MainSection = React.createClass({
  getInitialState: function() {
    return {error:'', name:''};
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
        <h1>Welcome {this.state.name}</h1>
        <Register />
        <Login />
        <div>{this.state.error}</div>
        <UserInfo />
        <DocumentVault />
        <RequestsVault />
        <UploadDoc />
      </div>
    );
  },

  _onChange2: function() {
    this.setState(seterror());
  }
});

module.exports = MainSection;
