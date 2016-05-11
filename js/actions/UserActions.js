var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var Functions = require('../api/Functions');
var RequestsConstants = require('../constants/RequestsConstants');
// To be removed :Sahil
var userID;

var UserActions = {

  UserRegister: function(name, email, password) {

    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REGISTER_LOADING,
      response: "loading ..."
    });


// Input: {‘email’, ‘name’, ‘password’}
// Output: {‘status’, ‘message’, ‘data’: User details including id}

    var registerData = {email, name, password}
    Functions.ajaxRequest("http://docx.8finatics.com/auth/register", 'POST', registerData, onSuccess);
    function onSuccess(data) {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_REGISTER_SUCCESS,
          response:data['message']
        });
      }
  },

// Input: {‘email’, ‘password’}
// Output: {‘status’, ‘message’, ‘data’: User details}

  UserLogin: function(email, password) {

    AppDispatcher.dispatch({
      actionType: UserConstants.USER_LOGIN_LOADING,
      response: "loading ..."
    });

    var loginData = {email, password}
    Functions.ajaxRequest("http://docx.8finatics.com/auth/login", 'POST', loginData, function (data) {
      userID = data.data.id;
      AppDispatcher.dispatch({
        actionType: UserConstants.USER_LOGIN_SUCCESS,
        response: data['message']
      });

      AppDispatcher.dispatch({
        actionType: UserConstants.USER_INFO,
        response:data
      });

      // Call for getting all docs
      Functions.ajaxRequest("http://docx.8finatics.com/documents","GET",null,function (data) {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_ALL_DOCUMENTS,
          response: data
        });
      });

      // Call for getting requests pending on others
      Functions.ajaxRequest("http://docx.8finatics.com/user/"+userID+"/action/pending_requests","GET",null,function (data) {
        AppDispatcher.dispatch({
          actionType: RequestsConstants.REQUESTS_PENDING_ON_OTHERS,
          response: data
        });
      });

      // Call for getting requests pending on me
      Functions.ajaxRequest("http://docx.8finatics.com/user/"+userID+"/action/pending_signs","GET",null,function (data) {
        AppDispatcher.dispatch({
          actionType: RequestsConstants.REQUESTS_PENDING_ON_ME,
          response: data
        });
      });

      // Call for getting completed requests
      Functions.ajaxRequest("http://docx.8finatics.com/user/"+userID+"/action/completed_requests","GET",null,function (data) {
        AppDispatcher.dispatch({
          actionType: RequestsConstants.REQUESTS_COMPLETED,
          response: data
        });
      });
    });
  },

  UserUpload: function(fileObj) {

    AppDispatcher.dispatch({
      actionType: UserConstants.FILE_UPLOAD_LOADING,
      response: "uploading ..."
    });

    var fileData = new FormData();
    fileData.append("document", fileObj);
    fileData.append("title","");
    $.ajax({
      type: 'POST',
      data: fileData,
      url: "http://docx.8finatics.com/user/document",
      cache: false,
      processData: false,
      contentType: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Basic c2pAZmlub21lbmEuY29tOmxvbA=="
    },
      success: function(data) {
          AppDispatcher.dispatch({
            actionType: UserConstants.FILE_UPLOAD_SUCCESS,
            response:data
          });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
          AppDispatcher.dispatch({
            actionType: UserConstants.FILE_UPLOAD_FAIL,
            response: err.toString()
          });
      }.bind(this)
    });

  },

  SendLinkAadharOTP: function(aadharNum) {
    AppDispatcher.dispatch({
      actionType: UserConstants.LINK_AADHAR_OTP_SENDING,
      response: "sending otp ..."
    });

    var aadharData = {
       aadhaar_number: aadharNum,
       resend: true
    };
    if (aadharNum.length == 12) {
       //if (aadharNum.trim() !== '' && aadharNum.verhoeffCheck() === true)
           Functions.ajaxRequest('http://docx.8finatics.com/user/ekyc/register/otp', 'POST', aadharData, aadhaar_ekyc_resend_result);
    }
    function aadhaar_ekyc_resend_result(json) {
      AppDispatcher.dispatch({
        actionType: UserConstants.LINK_AADHAR_OTP_SENT,
        response: json['message']
      });
      //console.log(json['message']);
    }
  },

  VerifyLinkAadharOTP: function(aadharNum, input_otp) {
    AppDispatcher.dispatch({
      actionType: UserConstants.LINK_AADHAR_OTP_VERIFYING,
      response: "verifying otp ..."
    });

    var OTPData = {
           aadhaar_number: aadharNum,
           otp: input_otp
       };
       Functions.ajaxRequest('http://docx.8finatics.com/user/ekyc/validate', 'POST', OTPData, aadhaar_ekyc_otp_result);

    function aadhaar_ekyc_otp_result(json) {
      AppDispatcher.dispatch({
        actionType: UserConstants.LINK_AADHAR_OTP_VERIFIED,
        response: json['message']
      });
      //console.log(json);
    }  
  },

  SignDoc: function() {
    AppDispatcher.dispatch({
      actionType: UserConstants.DOC_SIGNING,
      response: "signing doc ..."
    });
  }
};



module.exports = UserActions;
