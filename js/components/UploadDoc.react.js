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
    return {is_user_auth:0, fileObj:'', imgsrc_list:[], status:''};
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
        <img id="doc1" src="http://docx.8finatics.com/doc_image/69a44890-1675-11e6-8255-029616a1ba6b_210_1.png" onMouseOver={this._onSign}></img>
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

  _onSign: function(event, id) {
  	event.preventDefault();
    $(document).ready(function () {
        $('#doc1').selectAreas({
          allowResize: true,
          minSize: [100, 50],
          onChanged: debugQtyAreas,
          width: 610,
          areas: []
        });
        
      });

      function debugQtyAreas (event, id, areas) {
        console.log(areas.length + " areas", arguments);
      };
	},

  _onChange2: function() {
    this.setState(setStatusAndImageList());
  }
});

module.exports = UploadDoc;