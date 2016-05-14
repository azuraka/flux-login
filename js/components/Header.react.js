var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserInfoStore = require('../stores/UserInfoStore');
var AuthStore = require('../stores/AuthStore');

var Header = React.createClass({

  getInitialState: function() {
    return {display: 0, userFirstName:'', userCredits:''};
  },
  
  componentDidMount: function() {
    UserInfoStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    UserInfoStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    if(this.state.display) {
      return (
        <div>
        	<div>
            <button id="dashboard" type="button" onClick={this._onSubmit}>Dashboard</button>
          	<button id="vault" type="button" onClick={this._onSubmit}>Document Vault</button>
            <button id="profile" type="button" onClick={this._onSubmit}>My Profile</button>
            <button id="transactions" type="button" onClick={this._onSubmit}>My Transactions</button>
            <button id="credits" type="button" onClick={this._onSubmit}>My Credits: {this.state.credits}</button>
            <button id="logout" type="button" onClick={this._onSubmit}>Logout</button>
          </div>
          <h1>Welcome {this.state.userFirstName}</h1>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },

  _onSubmit: function(event, id) {
    event.preventDefault();
    if(event.target.id != 'logout')
      UserActions.ChangeDisplay(event.target.id);
    //else
    //  UserActions.UserLogout();
  },
  
  _onChangeState: function() {
  	var data = UserInfoStore.update_user();
    this.setState({display: AuthStore.headerDisplay(), userFirstName: data.name});
  }

});

module.exports = Header;