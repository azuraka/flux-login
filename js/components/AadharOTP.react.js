var React = require('react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var AadharOTP = React.createClass({

  getInitialState: function() {
    return {display:1, status:'', input_otp:'', post_co:[], aadharNum:'', uuid:'', state_id:''};
  },
  
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    return (
      <div>
        <form>
          <div>
            <label htmlFor="input_otp">Enter OTP</label>
            <input id="input_otp" type="text" value={this.state.input_otp} onChange={this._onChange}/>
          </div>
          <div>
            <button id="verifyOTP" type="button" onClick={this._onSubmit}>Submit Aadhar OTP</button>
          </div>
        </form>
      </div>    
    );
  },

  _onChange: function(event, value, id) {
    if(event.target.id=="input_otp")
      this.setState({input_otp: event.target.value});
  },

  _onSubmit: function(event, id) {
    event.preventDefault();
    if(event.target.id=="verifyOTP") {
      UserActions.VerifyCheckAadharOTP('547406271887', this.state.uuid, this.state.state_id, this.state.post_co, this.state.input_otp);
    }
  },

  _onChangeState: function() {
    this.setState({uuid:UserStore.setDocInfo()[0], state_id:UserStore.setDocInfo()[1]});
  }
});

module.exports = AadharOTP;