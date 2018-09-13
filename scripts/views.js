function showHideMenuLinks() {
  $("#linkHome").show();
  if (localStorage.getItem('kinveyAuth')) {
    // We have logged in user
    $("#linkLogin").hide();
    $("#linkRegister").hide();
    $("#linkListBooks").show();
    $("#linkaddBook").show();
    $("#linkLogout").show();
  } else {
    // No logged in user
    $("#linkLogin").show();
    $("#linkRegister").show();
    $("#linkListBooks").hide();
    $("#linkaddBook").hide();
    $("#linkLogout").hide();
  }
}

function showView(viewName) {
  // Hide all views and show the selected view only
  $('main > section').hide();
  $('#' + viewName).show();
}

function showHomeView() {
  showView('viewHome');
}

function showLoginView() {
  showView('viewLogin');
  $('#formLogin').trigger('reset');
}

function showRegisterView() {
  $('#formRegister').trigger('reset');
  showView('viewRegister');
}

function showAddBookView() {
  $('#formAddBook').trigger('reset');
  showView('viewAddBook');
  $('#viewAddBook #textTitle').focus();
}

function loginUser() { // TODO
}

function registerUser() { // TODO
}

function logoutUser() { // TODO
}

function addBook() {
  ajaxStart();
  let data = {
    "title": $('#viewAddBook #textTitle').val(),
    "author": $('#viewAddBook #textAuthor').val(),
    "description": $('#viewAddBook #textDescription').val()
  }
  let request = postRequest('books', '', data);
  $.ajax(request)
    .then((response)=> {
        displaySuccess('Book added');
        ajaxStop();
        listBooks();
        $('#textTitle').val('');
        $('#textAuthor').val('');
        $('#textDescription').val('');
    })
    .catch((error)=> {
        displayError(error);
        ajaxStop();
    });
}

function editBook() {
  let id = $(this).parent().parent().attr('key');
  let request = {
    url: serviceUrl + 'books/' + id,
    headers: authHeaders,
    method: 'GET'
  }
  ajaxStart();
  $.ajax(request)
    .then((response) => {
      ajaxStop();
      showBook(response);
    })
    .catch((error) => {
      displayError(error);
    })
}

function updateBook() {
  let id = $('#viewUpdateBook').attr('key');
  let data = {
    "title": $('#viewUpdateBook #textTitle').val(),
    "author": $('#viewUpdateBook #textAuthor').val(),
    "description": $('#viewUpdateBook #textDescription').val()
  }
  let request = {
    url: serviceUrl + 'books/' + id,
    headers: authHeaders,
    method: 'PUT',
    data: JSON.stringify(data)
  }
  ajaxStart();
  $.ajax(request)
    .then((response) => {
      ajaxStop();
      listBooks();
    })
    .catch((error) => {
      displayError(error);
    })
}

function showBook(book) {
  $('#viewUpdateBook #textTitle').val(book.title);
  $('#viewUpdateBook #textAuthor').val(book.author);
  $('#viewUpdateBook #textDescription').val(book.description);
  showView('viewUpdateBook');
  $('#viewUpdateBook').attr('key', book._id);
}

function listBooks() {
  showView('viewListBooks');
  let request = getRequest('books');
  ajaxStart();
  $.ajax(request)
      .then((response) => {
          renderBooks(response);
       })
      .catch(() => {
        ajaxStop();
        displayError();
      });
}

function renderBooks(books) {
  $('#viewListBooks table tbody').empty();
  for (let book of books) {
    let btnDel = $('<button>').text('Delete').on('click', deleteBook)
    let btnEdit = $('<button>').text('Edit').on('click', editBook)
    let row = $('<tr>').attr('key', book._id);
    $(row).append($('<td>').text(book.title));
    $(row).append($('<td>').text(book.author));
    $(row).append($('<td>').text(book.description));
    $(row).append($('<td>').append(btnDel).append(btnEdit));
    $('#viewListBooks table tbody').append(row);
  }
  ajaxStop();
}

function deleteBook() {
  let id = $(this).parent().parent().attr('key');
  let request = {
    url: serviceUrl + 'books/' + id,
    headers: authHeaders,
    method: 'DELETE'
  }
  ajaxStart();
  $.ajax(request)
    .then(() => {
      displaySuccess('Book deleted')
      ajaxStop();
      listBooks();
    })
    .catch((error) => {
      displayError(error);
    })
}
