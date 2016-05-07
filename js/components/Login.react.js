var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');

var Login = React.createClass({

   getInitialState: function() {
    return {email: '', passwd: ''};
  },

  render: function() {
    return (
      <div>
        <h4>Login</h4>
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
            <button id="login" type="button" onClick={this._onSubmit}>Login</button>
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
  },

  _onSubmit: function(event, id) {
    event.preventDefault();
    if(event.target.id=="login") {
      if (this.state.passwd && this.state.email){
        UserActions.UserLogin(this.state.email, this.state.passwd);
        console.log("login successful");
      }
      else
        console.log("login failed");
    }
  } 

});

module.exports = Login;