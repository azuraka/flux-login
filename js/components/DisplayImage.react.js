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
    var images = this.props.list.map(function(list,i) {
      return [
        <div>
          <img className={'doc' + i} src={list} ></img>
        </div>
      ];
    });
    return (
      <div>
        {images}
      </div>
    );
  },
  _onChangeState: function() {
    this.setState({display: UserStore.displayImageDisplay()});
  }
});

module.exports = DisplayImage;