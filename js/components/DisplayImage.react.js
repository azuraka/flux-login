var React = require('react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var DisplayImage = React.createClass({
  propTypes: {
    list: React.PropTypes.array
  },

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
        <div>{this.props.list}</div>
        <h4>Preview of Uploaded Document</h4>
        <div>
        	<img id="temp" src={this.props.list}></img>
      	</div>
      </div>
    );
  },

  _onChangeState: function() {
  }
});

module.exports = DisplayImage;