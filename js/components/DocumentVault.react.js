var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var AllDocumentStore = require('../stores/AllDocumentStore');
var DocumentList = require('./DocumentList.react');

var DocumentVault = React.createClass({

  getInitialState: function() {
    return {
      uploaded_by_me_data : [],
      shared_by_others :[]
    }
  },
  componentDidMount: function() {
    AllDocumentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AllDocumentStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <h4>Uploaded By Me</h4>
        <DocumentList data={this.state.uploaded_by_me_data} />
        <h4>Shared By Others</h4>
        <DocumentList data={this.state.shared_by_others} />
      </div>
    );
  },

  _onChange: function() {
    var data = AllDocumentStore.get_all_documents();

    this.setState({
      uploaded_by_me_data : data.uploaded_by_me,
      shared_by_others : data.shared_by_others,
    }
    );
  },



});

module.exports = DocumentVault;
