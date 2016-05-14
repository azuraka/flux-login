var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');

var TransactionList = React.createClass({
  render: function() {
   var transactions = this.props.transactions.map(transactions => {
    return [
     	<div>
     	  <div className="row" >Transactions ID : {transactions.id}</div>
     	</div>
    ];
  });
  return <div className='transactionList box_padding left'>{transactions}</div>;
  }
});

module.exports = TransactionList;
