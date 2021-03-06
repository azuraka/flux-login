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
var msgCheckOTPSend;
var msgCheckOTPVerify;

var uuid = '';
var state_id = '';

var displayDashboard;
var displayDocumentVault;
var displayRequestsVault;
var displayUserInfo;
var displayTransactions;
var displayCredits;
var displayUploadDoc;
var displayDisplayImage;
var displayAadharLink;
var displaySignatureArea;
var displayAadharOTP;

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

function change_status_aadhar_otp(responseObjectMessage) {
  //console.log(responseObjectMessage);
  msgCheckOTPSend = responseObjectMessage;
}

function change_display_auth(){
  displayDashboard = 1;
  displayUploadDoc = 1;
}

function change_display_header(board) {
  if(board == 'dashboard') {
    displayDashboard = 1;
    displayDocumentVault = 0;
    displayRequestsVault = 0;
    displayUserInfo = 0;
    displayTransactions = 0;
    displayCredits = 0;

    displayUploadDoc = 1;
  }
  else if(board == 'vault') {
    displayDocumentVault = 1;
    displayRequestsVault = 1;
    displayDashboard = 0;
    displayUserInfo = 0;
    displayTransactions = 0;
    displayCredits = 0;

    displayDisplayImage = 0;
    displayAadharLink = 0;
    displaySignatureArea = 0;
    displayAadharOTP = 0;
  }
  else if(board == 'profile') {
    displayUserInfo = 1;
    displayDashboard = 0;
    displayDocumentVault = 0;
    displayRequestsVault = 0;
    displayTransactions = 0;
    displayCredits = 0;

    displayDisplayImage = 0;
    displayAadharLink = 0;
    displaySignatureArea = 0;
    displayAadharOTP = 0;
  }
  else if(board == 'transactions') {
    displayTransactions = 1;
    displayDashboard = 0;
    displayDocumentVault = 0;
    displayRequestsVault = 0;
    displayUserInfo = 0;
    displayCredits = 0;

    displayDisplayImage = 0;
    displayAadharLink = 0;
    displaySignatureArea = 0;
    displayAadharOTP = 0;
  }
  else if(board == 'credits') {
    displayCredits = 1;
    displayDashboard = 0;
    displayDocumentVault = 0;
    displayRequestsVault = 0;
    displayUserInfo = 0;
    displayTransactions = 0;
    
    displayDisplayImage = 0;
    displayAadharLink = 0;
    displaySignatureArea = 0;
    displayAadharOTP = 0;
  }
}

function change_display() {
  displayUploadDoc = 0;
  displayAadharLink = 1;
}

function change_display2() {
  displayAadharLink = 0;
  displaySignatureArea = 1;
  displayAadharOTP = 1;
}

function change_display3() {
  displayAadharOTP = 0;
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

  setStatusCheckOTP: function() {
    return msgCheckOTPSend;
  },

  setDocInfo: function() {
    return [uuid, state_id];
  },

  displayDashboard: function() {
    return displayDashboard;
  },

  displayDocumentVault: function() {
    return displayDocumentVault;
  },

  displayRequestsVault: function() {
    return displayRequestsVault;
  },

  displayUserInfo: function() {
    return displayUserInfo;
  },

  displayTransactions: function() {
    return displayTransactions;
  },

  displayCredits: function() {
    return displayCredits;
  },

  displayUploadDoc: function() {
    return displayUploadDoc;
  },

  aadharLinkDisplay: function() {
    return displayAadharLink;
  },

  signatureAreaDisplay: function() {
    return displaySignatureArea;
  },

  aadharOTPDisplay: function() {
    return displayAadharOTP;
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
    case UserConstants.USER_LOGIN_SUCCESS:
      change_display_auth();
      UserStore.emitChange();
      break;
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
    case UserConstants.SIGN_NOW:
      change_display();
      UserStore.emitChange();
      break;
    case UserConstants.CHANGE_PAGE_HEADER:
      change_display_header(action.board);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_SENDING:
      create_status_link_otp_send(action.response);
      UserStore.emitChange(action.response);
      break;
    case UserConstants.LINK_AADHAR_OTP_SENT:
      create_status_link_otp_send(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFYING:
      create_status_link_otp_verify(action.response);
      UserStore.emitChange(action.response);
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFIED:
      create_status_link_otp_verify(action.response);
      change_display2();
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFICATION_FAILED:
      create_status_link_otp_verify(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.LINK_AADHAR_OTP_VERIFICATION_AJAX_FAILED:
      // Currently passing even if failed
      change_display2();
      UserStore.emitChange();
      break;
    case UserConstants.CHECK_AADHAR_OTP_SENDING:
      change_status_aadhar_otp(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.CHECK_AADHAR_OTP_SENT:
      change_status_aadhar_otp(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.CHECK_AADHAR_OTP_VERIFYING:
      change_status_aadhar_otp(action.response);
      UserStore.emitChange();
      break;
    case UserConstants.CHECK_AADHAR_OTP_VERIFIED:
      //change_status_aadhar_otp(action.response);
      change_display3();
      UserStore.emitChange();
      break;
    case UserConstants.CHECK_AADHAR_OTP_VERIFICATION_FAILED:
      change_status_aadhar_otp(action.response);
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
