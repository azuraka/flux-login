var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var TransactionsStore = require('../stores/TransactionsStore');
var TransactionList = require('./TransactionList.react');

var AllTransactions = React.createClass({

  getInitialState: function() {
    return {
      display: 1,
      transactions : [],
    }
  },

  componentDidMount: function() {
    TransactionsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TransactionsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if(this.state.display){
      return (
        <div>
          <h2>My Transactions</h2>
          <TransactionList transactions={this.state.transactions} />
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },

  _onChange: function() {
    var transactions = TransactionsStore.get_transactions();

    this.setState({
      transactions : transactions
    });
  },



});

module.exports = AllTransactions;
