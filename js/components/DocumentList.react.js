var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var AllDocumentStore = require('../stores/AllDocumentStore');

var DocumentList = React.createClass({
  render: function() {
   var documents = this.props.documents.map(documents => {
    return [
     	<div>
     	  <div className="row" >Document ID : {documents.id}</div>
     	  <div className="row" >File Name : {documents.title}</div>
     	  <div className="row" >Number of Pages : {documents.num_pages}</div>
     	</div>
    ];
  });
  return <div className='documentList box_padding left'>{documents}</div>;
  }
});

module.exports = DocumentList;
