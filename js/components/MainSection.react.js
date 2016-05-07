var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var Register = require('./Register.react');
var Login = require('./Login.react');

var MainSection = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Welcome</h1>
        <Register />
        <Login />
      </div>
    );
  }
});

module.exports = MainSection;
