var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

function setStates(){
  console.log(UserStore.setImageList()[0]);
  return{
  	status: UserStore.setImageList()[0],
    imgsrc_list: UserStore.setImageList()[1]
  };
}

var UploadDoc = React.createClass({

  getInitialState: function() {
    return {is_user_auth:0, fileObj:'', imgsrc_list:'', status:''};
  },
  
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange2);
  },

//  componentWillUnmount: function() {
//    UserStore.removeChangeListener(this._onChange2);
//  },

  render: function() {
    return (
      <div>
        <h4>Upload Document</h4>
        <form>
          <div>
            <input id="filename" type="file" onChange={this._onUpload}/>
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

  _onChange2: function() {
    this.setState(setStates());
    //console.log(this.state.status);
    //console.log(this.state.imgsrc_list);
    
  }
});

module.exports = UploadDoc;