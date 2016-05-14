var React = require('react');
var UploadDoc = require('./UploadDoc.react');
var AadharLink = require('./AadharLink.react');
var SignatureArea = require('./SignatureArea.react');
var AadharOTP = require('./AadharOTP.react');
var UserStore = require('../stores/UserStore');

var Dashboard = React.createClass({

  getInitialState: function() {
    return {display:0};
  },
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    if(this.state.display){
      return (      
        <div>
          <UploadDoc />
          <AadharLink />
          <SignatureArea />
          <AadharOTP />
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },

  _onChangeState: function() {
    this.setState({
      display: UserStore.displayDashboard(),
    });
  }
});

module.exports = Dashboard;