var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');
var UserInfoStore = require('../stores/UserInfoStore');

var UserInfo = React.createClass({

  getInitialState: function() {
    return {display: 0, name: '', email: '', has_aadhaar: false};
  },
  componentDidMount: function() {
    UserInfoStore.addChangeListener(this._onChangeState);
    UserStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    UserInfoStore.removeChangeListener(this._onChangeState);
    UserStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    if(this.state.display){
      return (
        <div>
          <h2>UserInfo</h2>
          <form>
            Name : {this.state.name}
            Email : {this.state.email}
            Aadhaar Linked : {this.state.has_aadhaar}
          </form>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },

  _onChangeState: function() {
    var data = UserInfoStore.update_user();

    this.setState({
      display: UserStore.displayUserInfo(),
      name : data.name,
      email : data.email,
      has_aadhaar : data.has_aadhaar,
      userID : data.userID
    });
  }

});

module.exports = UserInfo;
