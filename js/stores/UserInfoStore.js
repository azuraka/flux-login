var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var name = "";
var email = "";
var has_aadhaar = false;
var userID = "";
var aadhaar_number = "";
var care_of = "";
var date_of_birth = "";
var gender ="";
var line1 = "";
var line2 = "";
var locality = "";
var city = "";
var state = "";
var pincode = "";
var photo = "";

function update_user(data) {
  name = data.name;
  email = data.email;
  has_aadhaar = data.has_aadhaar;
  userID = data.id;
}

function set_profile_info(profileinfo) {
  aadhaar_number = profileinfo.aadhaar_number,
  care_of = profileinfo.care_of,
  date_of_birth = profileinfo.date_of_birth,
  gender = profileinfo.gender,
  line1 = profileinfo.address.line1,
  line2 = profileinfo.address.line2,
  locality = profileinfo.address.locality,
  city = profileinfo.address.city,
  state = profileinfo.address.state,
  pincode = profileinfo.address.pincode,
  photo = profileinfo.address.photo
}

var UserInfoStore = assign({}, EventEmitter.prototype, {
  update_user: function() {
    var response = {
      name : name,
      email : email,
      has_aadhaar : has_aadhaar,
      userID : userID
    }
    return response;
  },
  get_profile_info : function () {
    var response = {
      aadhaar_number : aadhaar_number,
      care_of : care_of,
      date_of_birth : date_of_birth,
      gender : gender,
      line1 : line1,
      line2 : line2,
      locality : locality,
      city : city,
      state : state,
      pincode : pincode,
      photo : photo
    }
    return response;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case UserConstants.USER_INFO:
      // console.log(action.response);
      update_user(action.response['data']);
      UserInfoStore.emitChange();
      break;
    case UserConstants.USER_PROFILE_INFO:
      set_profile_info(action.response['data']);
      UserInfoStore.emitChange();
      break;

    default:
      // no op

  }
});

module.exports = UserInfoStore;
