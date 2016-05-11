var React = require('react');
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');

var Login = React.createClass({

  getInitialState: function() {
    return {display: 1, email: '', passwd: '', status: ''};
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    if(this.state.display){
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
    }
    else{
      return (
        <div></div>
        );
    }
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

  _onChangeState: function() {
    this.setState({display: AuthStore.authDisplay(), status: AuthStore.statusMsgLog()});
  }
});

module.exports = Login;
