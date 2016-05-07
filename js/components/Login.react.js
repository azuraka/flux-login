var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');

var Login = React.createClass({

  render: function() {
    return (
      <div>
        <h4>Login</h4>
        <form>
          <div>
            <input id="email" type="text"/>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input id="password" type="password"/>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Login;