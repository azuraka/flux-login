var React = require('react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var DisplayImage = React.createClass({

  getInitialState: function() {
    return {display:1};
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
        <h4>Preview of Uploaded Document</h4>
        <div>
        	<img id="temp" src="http://docx.8finatics.com/doc_image/69a44890-1675-11e6-8255-029616a1ba6b_210_1.png"></img>
      	</div>
      </div>
    );
  },

  _onChangeState: function() {
  }
});

module.exports = DisplayImage;