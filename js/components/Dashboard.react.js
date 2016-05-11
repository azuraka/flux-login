var React = require('react');
var UploadDoc = require('./UploadDoc.react');
var AadharLink = require('./AadharLink.react');
var SignatureArea = require('./SignatureArea.react');
var AadharOTP = require('./AadharOTP.react');

var Dashboard = React.createClass({

  getInitialState: function() {
    return {display:1};
  },

  render: function() {
    return (      
      <div>
        <UploadDoc />
        <AadharLink />
        <SignatureArea />
        <AadharOTP />
      </div>
    );
  }
});

module.exports = Dashboard;