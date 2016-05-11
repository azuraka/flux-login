var React = require('react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var AadharOTP = React.createClass({

  getInitialState: function() {
    return {display:1, fileObj:'', imgsrc_list:[], status:'', post_co:[], aadharNum:''};
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
            <button id="resendOTP" type="button" onClick={this._onSubmit}>Resend OTP</button>
          </div>
        </form>
      </div>
        
    );
  },
  
  _onSelectArea: function(event, id) {
  	event.preventDefault();
    var post_coordinates = [];
    $('#doc1').selectAreas({
      allowResize: true,
      minSize: [100, 50],
      onChanged: debugQtyAreas,
      width: 610,
      areas: []
    });

    function debugQtyAreas (event, id, areas) {
      //console.log(areas);
    };
	},

  _onChangeState: function() {
  }
});

module.exports = AadharOTP;