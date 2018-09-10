function showHideMenuLinks() {
  $("#linkHome").show();
  if (localStorage.getItem('kinveyAuth')) {
    // We have logged in user
    $("#linkLogin").hide();
    $("#linkRegister").hide();
    $("#linkListBooks").show();
    $("#linkCreateBook").show();
    $("#linkLogout").show();
  } else {
    // No logged in user
    $("#linkLogin").show();
    $("#linkRegister").show();
    $("#linkListBooks").hide();
    $("#linkCreateBook").hide();
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

function showCreateBookView() {
  $('#formCreateBook').trigger('reset');
  showView('viewCreateBook');
}

function loginUser() { // TODO
}

function registerUser() { // TODO
}

function logoutUser() { // TODO
}

function createBook() { // TODO
}

function editBook() { // TODO
}

function listBooks() {
  getBooks();
  showView('viewListBooks');
}

function deleteBook() {
  // TODO }
}
