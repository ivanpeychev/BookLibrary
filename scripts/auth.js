const kinveyAppId = "kid_ryAiIz-UQ";
const serviceUrl = `https://baas.kinvey.com/appdata/${kinveyAppId}/`;
const signUrl = `https://baas.kinvey.com/user/${kinveyAppId}/`;
const appSecret = `c14157192cfe4052a8e0bfa598a716e4`;
let authHeaders = { 'Authorization': '', 'Content-Type': 'application/json' };
let authData = { 'username': '', 'password': '' };
$(document).ready(() => {
    if (localStorage.getItem('userName') != null) {
        $('#loggedInUser').text(`Hello, ${localStorage.getItem('userName')}`);
    } else {
        $('#loggedInUser').text('');
    }
});

function login() {
    ajaxStart();
    authData.username = $('#viewLogin #username').val();
    authData.password = $('#viewLogin #password').val();
    authHeaders.Authorization = `Basic ${btoa(authData.username + ":" + authData.password)}`;

    let request = {
        url: signUrl + 'login',
        headers: authHeaders,
        method: 'POST',
        data: JSON.stringify(authData)
    };
    $.ajax(request)
      .then((response) => {
          displaySuccess('Yeah! You have successfully logged in.');
          localStorage.setItem('kinveyAuth', `Kinvey ${response._kmd.authtoken}`);
          localStorage.setItem('userName', authData.username);
          localStorage.setItem('userId', response._id);
          showHideMenuLinks();
          ajaxStop();
          listBooks();
          $('#loggedInUser').text(`Hello, ${localStorage.getItem('userName')}`);
          authHeaders.Authorization = 'Kinvey ' + localStorage.getItem('kinveyAuth');
       })
      .catch(() => {
        ajaxStop();
        displayError();
      });
}

function logout() {
    ajaxStart();
    let request = {
        url: signUrl + '_logout',
        headers: authHeaders,
        method: 'POST'
    };
    $.ajax(request)
      .then((response) => {
          localStorage.clear();
          displaySuccess('You have successfully logged out.');
          $('#loggedInUser').text(``);
          showHideMenuLinks();
          showLoginView();
          ajaxStop();
       })
      .catch(() => {
        localStorage.clear();
        ajaxStop();
        displayError();
      });
}

function register() {
    ajaxStart();
    authHeaders.Authorization = `Basic ${btoa(kinveyAppId + ":" + appSecret)}`;
    authData.username = $("#formRegister input[name='username']").val();
    authData.password = $("#formRegister input[name='password']").val();
    let request = {
        url: signUrl,
        headers: authHeaders,
        method: 'POST',
        data: JSON.stringify(authData)
    };
    $.ajax(request)
      .then((response) => {
          displaySuccess('You have successfully registered.');
          localStorage.setItem('kinveyAuth', `Kinvey ${response._kmd.authtoken}`);
          $('#loggedInUser').text(`Hello, ${authData.username}`);
          authHeaders.Authorization = 'Kinvey ' + localStorage.getItem('kinveyAuth');
          showHideMenuLinks();
          showHomeView();
          ajaxStop();
       })
      .catch(() => {
        ajaxStop();
        displayError();
      });
}

function getRequest(resource) {
    authHeaders.Authorization = localStorage.getItem('kinveyAuth');
    let request = {
        url: serviceUrl + resource,
        headers: authHeaders,
        method: 'GET'
    }
    return request;
}

function postRequest(resource, query = '', data) {
    let request = {
        url: serviceUrl + resource + query,
        headers: authHeaders,
        method: 'POST',
        data: JSON.stringify(data)
    }
    return request;
}
