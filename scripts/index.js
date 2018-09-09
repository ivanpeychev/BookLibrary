$(document).ready(() => {
  showHideMenuLinks();
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
  $("#formLogin").submit(loginUser);
  $("form").submit(function(e) { e.preventDefault() });
  $("#linkLogin").click(showLoginView);
  $("#linkRegister").click(showRegisterView);
  $("#linkListBooks").click(listBooks);
  $("#linkCreateBook").click(showCreateBookView);
  $("#linkLogout").click(logoutUser);
  // Bind the form submit buttons
  $("#buttonLoginUser").click(loginUser);
  $("#buttonRegisterUser").click(registerUser);
  $("#buttonCreateBook").click(createBook);
  $("#buttonEditBook").click(editBook);

});
