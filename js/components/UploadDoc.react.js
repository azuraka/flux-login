var React = require('react');
var DisplayImage = require('./DisplayImage.react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var UploadDoc = React.createClass({

  getInitialState: function() {
    return {display:1, fileObj:'', status:'', img_list:[]};
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
        <h3>Upload Document</h3>
        <form>
          <div>
            <input id="filename" type="file" onChange={this._onUpload}/>
          </div>
        </form>
        <div>{this.state.status}</div>
        <DisplayImage list={this.state.img_list}/>
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

  _onChangeState: function() {
    this.setState({status: UserStore.setStatus(), img_list: UserStore.setImageList()});
  }
});

module.exports = UploadDoc;