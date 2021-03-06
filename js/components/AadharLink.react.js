var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var AadharLink = React.createClass({

  getInitialState: function() {
    return {display: 0, aadharNum:'', input_otp:'', status1:'', status2:''};
  },
  
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    if(this.state.display) {
      return (
        <div>
          <h2>Link Aadhar</h2>
          <form>
            <div>
              <label htmlFor="aadharNum">Enter your Aadhar number</label>
              <input id="aadharNum" type="text" value={this.state.aadharNum} onChange={this._onChange}/>
            </div>
            <div>
              <button id="sendOTP" type="button" onClick={this._onSubmit}>Send OTP</button>
            </div>
          </form>
          <div>{this.state.status1}</div>
          <form>
            <div>
              <label htmlFor="input_otp">Enter OTP</label>
              <input id="input_otp" type="text" value={this.state.input_otp} onChange={this._onChange}/>
            </div>
            <div>
              <button id="resendOTP" type="button" onClick={this._onSubmit}>Resend OTP</button>
              <button id="verifyOTP" type="button" onClick={this._onSubmit}>Verify</button>
            </div>
          </form>
          <div>{this.state.status2}</div>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },
  
  _onChange: function(event, value, id) {
    if(event.target.id=="aadharNum")
      this.setState({aadharNum: event.target.value});
    else if(event.target.id=="input_otp")
      this.setState({input_otp: event.target.value});
  },

  _onSubmit: function(event, id) {
    event.preventDefault();
    if(event.target.id=="sendOTP" || event.target.id=="resendOTP") {
      UserActions.SendLinkAadharOTP(this.state.aadharNum);
    }
    else if(event.target.id=="verifyOTP") {
      UserActions.VerifyLinkAadharOTP(this.state.aadharNum, this.state.input_otp);
    }
  },

  _onChangeState: function() {
    this.setState({display: UserStore.aadharLinkDisplay() ,status1: UserStore.setStatusLinkOTPSend(), status2: UserStore.setStatusLinkOTPVerify()});
  }

});

module.exports = AadharLink;