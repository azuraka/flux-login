var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');

var Login = React.createClass({

   getInitialState: function() {
    return {email: '', passwd: '', status: '', display: 1};
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
        <h2>Login</h2>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={this.state.email} onChange={this._onChange}/>
          </div>
          <div>
            <label htmlFor="passwd">Password</label>
            <input id="passwd" type="password" value={this.state.passwd} onChange={this._onChange}/>
          </div>
          <div>
            <button id="login" type="button" onClick={this._onSubmit}>Login</button>
          </div>
        </form>
        <div>{this.state.status}</div>
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
      }
    }
  },

  _onChange2: function() {
    this.setState({status: AuthStore.statusMsgLog()});
  }
});

module.exports = Login;
