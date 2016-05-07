var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');

var Register = React.createClass({

  render: function() {
    return (
      <div>
        <h4>Register Account</h4>
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
            <input id="confirmPassword" type="password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Register;