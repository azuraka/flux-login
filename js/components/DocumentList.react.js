var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var AllDocumentStore = require('../stores/AllDocumentStore');

var DocumentList = React.createClass({

  render: function() {

   var documents = this.props.data.map(data => {
       return <div class="row" >{data.id}</div>
   });
   return <div className='documentList'>{documents}</div>;

  },


});

module.exports = DocumentList;
