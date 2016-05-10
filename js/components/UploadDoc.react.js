var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

function setStatusAndImageList(){
  return{
  	status: UserStore.setStatus(),
  	imgsrc_list: UserStore.setImageList()
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
        <h4>Converted to Image</h4>
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

  _onChange2: function() {
    this.setState(setStatusAndImageList());
  }
});

module.exports = UploadDoc;