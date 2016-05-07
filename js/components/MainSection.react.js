var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var Register = require('./Register.react');
var Login = require('./Login.react');
var UserStore = require('../stores/UserStore');

function seterror(){
  return{
    error: UserStore.errorMsg()
  };
}

var MainSection = React.createClass({
  getInitialState: function() {
    return {error:''};
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange2);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange2);
  },

  render: function() {
    return (
      <div>
        <h1>Welcome</h1>
        <Register />
        <Login />
        <div>{this.state.error}</div>
      </div>
    );
  },

  _onChange2: function() {
    this.setState(seterror());
  }
});

module.exports = MainSection;
