var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');
var AadharLink = require('./AadharLink.react');

function setStatusAndImageList(){
  return{
  	status: UserStore.setStatus(),
  	imgsrc_list: UserStore.setImageList([])
  };
}

var UploadDoc = React.createClass({

  getInitialState: function() {
    return {is_user_auth:0, fileObj:'', imgsrc_list:[], status:'', post_co:[], aadharNum:''};
  },
  
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange2);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange2);
  },

  render: function() {
    return (
      <div>
        <h3>Upload Document</h3>
        <form>
          <div>
            <input id="filename" type="file" onChange={this._onUpload}/>
          </div>
        </form>
        <div>{this.state.status}</div>
        <div>{this.state.imgsrc_list}</div>
        <h4>Preview of Uploaded Document</h4>
        <img id="temp" src="http://docx.8finatics.com/doc_image/69a44890-1675-11e6-8255-029616a1ba6b_210_1.png"></img>
        <AadharLink />
        <img id="doc1" src="http://docx.8finatics.com/doc_image/69a44890-1675-11e6-8255-029616a1ba6b_210_1.png" onMouseOver={this._onSelectArea}></img>
        <div>
            <button id="sign" type="button" onClick={this._onSign}>Finalize Selected Area and SendOTP</button>
        </div>
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
  
  _onUpload: function(event, id) {
    event.preventDefault();
    if(event.target.id=="filename") {
      this.state.fileObj = event.target.files[0];
      UserActions.UserUpload(this.state.fileObj);
    }
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

  _onSign: function(event, id) {
    event.preventDefault();
    if(event.target.id=="sign") {
      var post_coordinates = [];
      var image_co = $('#doc1').selectAreas('areas');
      if(image_co.length !== 0) {
        var img = document.getElementById('doc1');
        var width = img.clientWidth;
        var height = img.clientHeight;;
        for (var q = 0; q < image_co.length; q++) {
          var x1 = image_co[q].x;
          var y1 = image_co[q].y;
          var x2 = image_co[q].x + image_co[q].width;
          var y2 = image_co[q].y + image_co[q].height;
          x1 = Math.round(x1 / width * 72 * 8.27);
          y1 = Math.round((1 - y1 / height) * 72 * 11.69);
          x2 = Math.round(x2 / width * 72 * 8.27);
          y2 = Math.round((1 - y2 / height) * 72 * 11.69);
          post_coordinates.push([x1, y1, x2, y2, 1]);
        }
        
        // Imp observation - The comment statement below doesn't work when
        // uncommented, but statement below it works

        //this.setState({post_co: post_coordinates});
        //console.log(this.state.post_co);
        this.setState({post_co: post_coordinates}, function () {
          console.log(this.state.post_co);
        });
      }
      //UserActions.SendLinkAadharOTP();
   }
  },

  _onChange2: function() {
    this.setState(setStatusAndImageList());
  }
});

module.exports = UploadDoc;