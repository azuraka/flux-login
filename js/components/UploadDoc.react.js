var React = require('react');
var DisplayImage = require('./DisplayImage.react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');
var AuthStore = require('../stores/AuthStore');

var UploadDoc = React.createClass({

  getInitialState: function() {
    return {display: 0, fileObj:'', status:'', img_list:[], uuid:'', state_id:''};
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
          <h2>Upload Document</h2>
          <form>
            <div>
              <input id="filename" type="file" onChange={this._onUpload}/>
            </div>
          </form>
          <div>{this.state.status}</div>
          <DisplayImage list={this.state.img_list}/>
        </div>       
      );
    }
    else{
      return(<div></div>);
    }
  },
  
  _onUpload: function(event, id) {
    event.preventDefault();
    if(event.target.id=="filename") {
      this.state.fileObj = event.target.files[0];
      UserActions.UserUpload(this.state.fileObj);
    }
  },

  _onChangeState: function() {
    this.setState({display: AuthStore.uploadDocDisplay(), status: UserStore.setStatusFileUpload(), img_list: UserStore.setImageList(), uuid: UserStore.setDocInfo()[0], state_id: UserStore.setDocInfo()[1]});
  }
});

module.exports = UploadDoc;