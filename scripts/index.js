$(document).ready(() => {
  showHideMenuLinks();
  showHomeView()
  $("#viewLogin input[value='Login']").on('click', ()=> {
    event.preventDefault();
    login();
    showHideMenuLinks();
  });
  $('#linkLogout').on('click', logout);

  $("#viewRegister input[value='Register']").on('click', ()=> {
    event.preventDefault();
    register();
    showHideMenuLinks();
  });

  // Bind the navigation menu links
  $("#linkHome").click(showHomeView);
  // Bind the form submit actions
  $("form").submit(function(e) { e.preventDefault() });
  $("#linkLogin").click(showLoginView);
  $("#linkRegister").click(showRegisterView);
  $("#linkListBooks").click(listBooks);
  $("#linkAddBook").click(showAddBookView);
  $("#linkLogout").click(logoutUser);
  // Bind the form submit buttons
  $("#buttonLoginUser").click(loginUser);
  $("#buttonRegisterUser").click(registerUser);
  $("#btnAddBook").click(addBook);
  $("#btnUpdateBook").click(updateBook);
});
