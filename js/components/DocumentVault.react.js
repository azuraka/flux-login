var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');
var AllDocumentStore = require('../stores/AllDocumentStore');
var DocumentList = require('./DocumentList.react');

var DocumentVault = React.createClass({

  getInitialState: function() {
    return {
      display: 0,
      uploaded_by_me_data : [],
      shared_by_others :[]
    }
  },

  componentDidMount: function() {
    AllDocumentStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AllDocumentStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if(this.state.display){
      return (
        <div>
          <h2>Uploaded By Me</h2>
          <DocumentList documents={this.state.uploaded_by_me_data} />
          <h2>Shared By Others</h2>
          <DocumentList documents={this.state.shared_by_others} />
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },

  _onChange: function() {
    var data_uploaded_by_me = AllDocumentStore.get_docs_uploaded_by_me();
    // var data_shared_by_others = AllDocumentStore.get_docs_shared_by_others();
    this.setState({
      display: UserStore.displayDocumentVault(),
      uploaded_by_me_data : data_uploaded_by_me,
      // shared_by_others : data_shared_by_others
    });
  },



});

module.exports = DocumentVault;
