var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');
var Functions = require('../api/Functions');

var CHANGE_EVENT = 'change';
var imgList = [];
var imgListSigned = [];
var msgFileUpload = '';
var msgLinkOTPSend = '';
var msgLinkOTPVerify = '';
var uuid = '';
var state_id = '';

function create_image_list(json) {
  json['image_paths'].forEach(function(url) {
    imgList.push("http://docx.8finatics.com/" + url);
  });
}

function create_image_list_signed(json) {
  json['image_paths'].forEach(function(url) {
    imgListSigned.push("http://docx.8finatics.com/" + url);
  });
}

function create_status_file_upload(responseObjectMessage) {
  msgFileUpload = responseObjectMessage;
}

function create_status_link_otp_send(responseObjectMessage) {
  msgLinkOTPSend = responseObjectMessage;
}

function create_status_link_otp_verify(responseObjectMessage) {
  msgLinkOTPVerify = responseObjectMessage;
}

function create_docInfo(data) {
  uuid = data['uuid'];
  state_id = data['state_id'];
}

var UserStore = assign({}, EventEmitter.prototype, {
  setImageList: function() {
    return imgList;
  },

  setImageListSigned: function() {
    return imgListSigned;
  },

  setStatusFileUpload: function() {
    return msgFileUpload;
  },

  setStatusLinkOTPSend: function() {
    return msgLinkOTPSend;
  },

  setStatusLinkOTPVerify: function() {
    return msgLinkOTPVerify;
  },

  setDocInfo: function() {
    return [uuid, state_id];
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
      create_status_file_upload(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.FILE_UPLOAD_SUCCESS:
      create_status_file_upload(action.response[0]['message']);
      create_docInfo(action.response[0]['data']);
      UserStore.emitChange();
      break;
    case UserConstants.FILE_UPLOAD_FAIL:
      create_status_file_upload(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.DISPLAY_IMAGE_SUCCESS:
      create_image_list(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_SENDING:
      create_status_link_otp_send(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_SENT:
      create_status_link_otp_send(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFYING:
      create_status_link_otp_verify(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFIED:
      create_status_link_otp_verify(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.DISPLAY_SIGNED_IMAGE_SUCCESS:
      console.log(action.response);
      create_image_list_signed(action.response);
      UserStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = UserStore;
