
var Functions = {
    ajaxRequest: function(url, method, data, onSuccess, onFailure) {
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
};

module.exports = Functions;