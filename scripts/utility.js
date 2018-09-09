function displayError(error) {
    let errDiv = $('<div>').attr('id','errorDiv').text('Error ' + error.status + ' ' + error.statusText + ' (' + error.responseJSON.error + ')').css('color','red').addClass("alert alert-danger fade in");
    $(document.body).prepend(errDiv);
    setTimeout(function() {
        errDiv.fadeOut(function() {
            errDiv.remove()
        });
    }, 4000);
}

function displaySuccess(message) {
    let successDiv = $('<div>').attr('id','successDiv').text(message).css('color','green').addClass("alert alert-success alert-dismissible fade in");
    $(document.body).prepend(successDiv);
    setTimeout(function() {
        successDiv.fadeOut(function() {
            successDiv.remove()
        });
    }, 3000);
}

function displaySuccess(message) {
    let successDiv = $('<div>').attr('id','successDiv').text(message).css('color','green').addClass("alert alert-success alert-dismissible fade in");
    $(document.body).prepend(successDiv);
    setTimeout(function() {
        successDiv.fadeOut(function() {
            successDiv.remove()
        });
    }, 3000);
}

function ajaxStart() {
  let loadingDiv = $('<div>').attr('id','loadingBox').text('Loading...').addClass("alert alert-info alert-dismissible fade in").attr('role', 'alert');
  $(document.body).prepend(loadingDiv);
}

function ajaxStop() {
  $('#loadingBox').fadeOut(function() {
    $('#loadingBox').remove()
  });
}
