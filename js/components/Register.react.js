var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');


var Register = React.createClass({

  getInitialState: function() {
    return {name: '', email: '', passwd: '', confm_passwd: ''};
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
        <h2>Register Account</h2>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={this.state.name} onChange={this._onChange}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={this.state.email} onChange={this._onChange}/>
          </div>
          <div>
            <label htmlFor="passwd">Password</label>
            <input id="passwd" type="password" value={this.state.passwd} onChange={this._onChange}/>
          </div>
          <div>
            <label htmlFor="confm_passwd">Confirm Password</label>
            <input id="confm_passwd" type="password" value={this.state.confm_passwd} onChange={this._onChange}/>
          </div>
          <div>
            <button id="register" type="button" onClick={this._onSubmit}>Register</button>
          </div>
        </form>
      </div>
    );
  },

  _onChange: function(event, value, id) {
    if(event.target.id=="name")
      this.setState({name: event.target.value});
    else if(event.target.id=="email")
      this.setState({email: event.target.value});
    else if(event.target.id=="passwd")
      this.setState({passwd: event.target.value});
    else if(event.target.id=="confm_passwd")
      this.setState({confm_passwd: event.target.value});
  },

  _onSubmit: function(event, id) {
    event.preventDefault();
    if(event.target.id=="register") {
      if (this.state.passwd==this.state.confm_passwd && this.state.email && this.state.passwd && this.state.confm_passwd && this.state.name){
        UserActions.UserRegister(this.state.name, this.state.email, this.state.passwd);
      }
      else
        console.log("Registration Failed !");
    }
  },

  _onChange2: function() {
  }
});

module.exports = Register;
