var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');
var Functions = require('../api/Functions');

var CHANGE_EVENT = 'change';
var imgList = [];
var msg = '';

function onSuccess(json) {
  imgList = json;
  //json['image_paths'].forEach(function(url){
  //  imgList.push("http://docx.8finatics.com/" + url);
  //});
  //create_imgList(null, imgList);
  //console.log(imgList);
}


function create_imgList(responseObjectData, outputData) {
  if (!outputData){
    data = responseObjectData;
    all_img_url = "http://docx.8finatics.com/document/" + data['uuid'] + "/" + data['state_id'] + "/images";
    Functions.ajaxRequest(all_img_url,"GET",null,onSuccess);
  }
  else{
    //console.log(outputData);
    UserStore.setImageList(imgList);
  }
}

function create_status(responseObjectMessage) {
  msg = responseObjectMessage;
}

var UserStore = assign({}, EventEmitter.prototype, {
  setImageList: function(imgList) {
    return imgList;
  },

  setStatus: function() {
    return msg;
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
    case UserConstants.FILE_UPLOAD_LOADING:
      create_status(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.FILE_UPLOAD_SUCCESS:
      create_imgList(action.response[0]['data'], null);
      create_status(action.response[0]['message']);
      UserStore.emitChange();
      break;
    case UserConstants.FILE_UPLOAD_FAIL:
      create_status(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_SENDING:
      create_status(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_SENT:
      create_status(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFYING:
      create_status(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFIED:
      create_status(action.response);
      UserStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = UserStore;
