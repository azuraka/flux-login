var MainSection = require('./MainSection.react');
var React = require('react');

var UserApp = React.createClass({
  render: function() {
    return (
      <div>
        <MainSection />
      </div>
    );
  }
});

module.exports = UserApp;
