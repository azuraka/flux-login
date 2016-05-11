var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var AllDocumentStore = require('../stores/AllDocumentStore');

var RequestList = React.createClass({
  render: function() {
   var requests = this.props.requests.map(requests => {
     return [
      <div>
        <div className="row" >Document ID : {requests.document.id}</div>
        <div className="row" >Document Title : {requests.document.title}</div>
        <div className="row" >Number of pages : {requests.document.num_pages}</div>
        if(requests.blocked_on != 0)
        {
          <div className="row" >Number of Signatures Left  : {requests.document.blocked_on}</div>
        }
      </div>
    ];
   });
   return <div className='documentList box_padding left'>{requests}</div>;

  },
});

module.exports = RequestList;
