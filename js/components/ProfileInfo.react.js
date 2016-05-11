var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var AuthStore = require('../stores/AuthStore');
var UserInfoStore = require('../stores/UserInfoStore');

var ProfileInfo = React.createClass({

  getInitialState: function() {
    return {
      display: 0,
      name: '',
      email: '',
      has_aadhaar: false,
      aadhaar_number : '',
      care_of : '',
      date_of_birth : '',
      gender : '',
      line1 : '',
      line2 : '',
      locality : '',
      city : '',
      state : '',
      pincode : '',
      photo : ''
     };
  },
  componentDidMount: function() {
    UserInfoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserInfoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if(this.state.display){
      return (
        <div>
          <h2>My Profile</h2>
          <div className="row">
              <div className="row">
                {this.state.photo}
              </div>
              <div className="row">
                Full Name : {this.state.name}
              </div>
              <div className="row">
                Email : {this.state.email}
              </div>
              <div className="row">
                Aadhaar Number : {this.state.aadhaar_number}
              </div>
              <div className="row">
                {this.state.care_of}
              </div>
              <div className="row">
                DOB : {this.state.date_of_birth}
              </div>
              <div className="row">
                Gender : {this.state.gender}
              </div>
              <div className="row">
                Address : {this.state.line1}<br/>

                {this.state.line2}<br/>
                {this.state.locality}<br/>
                {this.state.city} {this.state.state}<br/>
                {this.state.pincode}<br/>
              </div>
          </div>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  },

  _onChange: function() {
    var data = UserInfoStore.update_user();
    var profileinfo = UserInfoStore.get_profile_info();

    this.setState({
      name : data.name,
      email : data.email,
      has_aadhaar : data.has_aadhaar,
      userID : data.userID,
      aadhaar_number : profileinfo.aadhaar_number,
      care_of : profileinfo.care_of,
      date_of_birth : profileinfo.date_of_birth,
      gender : profileinfo.gender,
      line1 : profileinfo.line1,
      line2 : profileinfo.line2,
      locality : profileinfo.locality,
      city : profileinfo.city,
      state : profileinfo.state,
      pincode : profileinfo.pincode,
      photo : profileinfo.photo
    }
    );

  },



});

module.exports = ProfileInfo;
