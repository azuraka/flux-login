var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  UserRegister: function(name, email, password) {

    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REGISTER_LOADING,
      response: "loading"
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
          response: "loading"
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
      response: "uploading"
    });

    //console.log(fileObj);

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
          //console.log(data);
          AppDispatcher.dispatch({
            actionType: UserConstants.FILE_UPLOAD_SUCCESS,
            UploadStatus: "Successful",
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

  }
};

module.exports = UserActions;
