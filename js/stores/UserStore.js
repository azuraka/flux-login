var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var imgList = [];
var msg = '';
var imgListString = '';

function ajaxRequest(url, method, data, onSuccess, onFailure) {
    $.ajax({
        headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Basic c2pAZmlub21lbmEuY29tOmxvbA=="
    },
        url: url,
        data: data,
        type: method,

        success: function(json) {
            if (typeof onSuccess !== 'undefined' && typeof onSuccess === "function") {
                onSuccess(json);
            }
        },
        error: function(xhr, status, errorThrown) {
            if (typeof onFailure !== 'undefined' && typeof onFailure === "function") {
                onFailure();
            }
        },
        complete: function(xhr, status) {

        }
    });
}

function onSuccess(json) {
  json['image_paths'].forEach(function(url){
    imgList.push("http://docx.8finatics.com/" + url);
  });
  create_imgList(null, imgList);
  console.log(imgList);
}


function create_imgList(responseObjectData, outputData) {
  if (!outputData){
    data = responseObjectData;
    all_img_url = "http://docx.8finatics.com/document/" + data['uuid'] + "/" + data['state_id'] + "/images";
    ajaxRequest(all_img_url,"GET",null,onSuccess);
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
