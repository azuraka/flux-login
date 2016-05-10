var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');




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

var UserActions = {

  UserRegister: function(name, email, password) {

    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REGISTER_LOADING,
      response: "loading ..."
    });



// Input: {‘email’, ‘name’, ‘password’}
// Output: {‘status’, ‘message’, ‘data’: User details including id}

    var registerData = {email, name, password}

    $.ajax({
      type: 'POST',
      data: registerData,
      url: "http://docx.8finatics.com/auth/register",
      dataType: 'json',
      cache: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
    },
      success: function(data) {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_REGISTER_SUCCESS,
          name: name,
          email: email,
          registerationStatus: "Successful",
          response:data
        });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_REGISTER_FAIL,
          response: err.toString()
        });
      }.bind(this)
    });
  },

// Input: {‘email’, ‘password’}
// Output: {‘status’, ‘message’, ‘data’: User details}

  UserLogin: function(email, password) {

        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGIN_LOADING,
          response: "loading ..."
        });

    var loginData = {email, password}

    $.ajax({
      type: 'POST',
      data: loginData,
      url: "http://docx.8finatics.com/auth/login",
      dataType: 'json',
      cache: false,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
    },
      success: function(data) {
          AppDispatcher.dispatch({
            actionType: UserConstants.USER_LOGIN_SUCCESS,
            name: name,
            email: email,
            LoginStatus: "Successful",
            response:data
          });
          AppDispatcher.dispatch({
            actionType: UserConstants.USER_INFO,
            response:data
          });


          // Call for getting all docs
          ajaxRequest("http://docx.8finatics.com/documents","GET",null,function (data) {
            AppDispatcher.dispatch({
              actionType: UserConstants.USER_ALL_DOCUMENTS,
              response: data
            });
          });

      }.bind(this),


      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
          AppDispatcher.dispatch({
            actionType: UserConstants.USER_LOGIN_FAIL,
            response: err.toString()
          });
      }.bind(this)
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
           ajaxRequest('http://docx.8finatics.com/user/ekyc/register/otp', 'POST', aadharData, aadhaar_ekyc_resend_result);
    }
    function aadhaar_ekyc_resend_result(json) {
      console.log(json);
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
       ajaxRequest('http://docx.8finatics.com/user/ekyc/validate', 'POST', OTPData, aadhaar_ekyc_otp_result);

    function aadhaar_ekyc_otp_result(json) {
      console.log(json);
    }  

  }
};



module.exports = UserActions;
