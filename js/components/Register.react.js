var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');

var Register = React.createClass({

  getInitialState: function() {
    return {email: '', passwd: '', confm_passwd: ''};
  },

  render: function() {
    return (
      <div>
        <h4>Register Account</h4>
        <form>
          <div>
            <input id="email" type="text" value={this.state.email} onChange={this._onChange}/>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input id="passwd" type="password" value={this.state.passwd} onChange={this._onChange}/>
            <label htmlFor="passwd">Password</label>
          </div>
          <div>
            <input id="confm_passwd" type="password" value={this.state.confm_passwd} onChange={this._onChange}/>
            <label htmlFor="confm_passwd">Confirm Password</label>
          </div>
          <div>
            <button id="register" type="button" onClick={this._onSubmit}>Register</button>
          </div>
        </form>
      </div>
    );
  },

  _onChange: function(event, value, id) {
    if(event.target.id=="email")
      this.setState({email: event.target.value});
    else if(event.target.id=="passwd")
      this.setState({passwd: event.target.value});
    else if(event.target.id=="confm_passwd")
      this.setState({confm_passwd: event.target.value});
  },

  _onSubmit: function(event, id) {
    event.preventDefault();
    if(event.target.id=="register") {
      if (this.state.passwd==this.state.confm_passwd && this.state.email && this.state.passwd && this.state.confm_passwd){ 
        UserActions.UserRegister(this.state.email, this.state.passwd, this.state.confm_passwd);
        console.log("register successful");
      }
      else
        console.log("register failed");
    }
  } 



});

module.exports = Register;