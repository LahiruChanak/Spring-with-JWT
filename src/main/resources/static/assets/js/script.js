$(document).ready(function () {
  // Password visibility toggle
  $(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: "http://localhost:8082/api/v1/auth/authenticate",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email: $("#email").val(),
        password: $("#password").val(),
      }),
      success: function (response) {
        localStorage.setItem("jwt_token", response.token);
        $("#loginForm")[0].reset();
        window.location.href = "pages/dashboard.html";
      },
      error: function (xhr, status, error) {
        alert("Login failed. Please check your credentials.");
        console.error("Error:", error);
      },
    });
  });

  // -------------------------------- Signup --------------------------------
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    $.ajax({
      url: "http://localhost:8082/api/v1/user/register",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email: $("#email").val(),
        password: password,
        name: $("#name").val(),
        role: $("#role").val(),
      }),
      success: function (response) {
        alert("Registration successful! Please login.");
        $("#registerForm")[0].reset();
        window.location.href = "../index.html";
      },
      error: function (xhr, status, error) {
        alert("Registration failed. Please try again.");
        console.error("Error:", error);
        if (xhr.responseJSON && xhr.responseJSON.message) {
          alert(xhr.responseJSON.message);
        }
      },
    });
  });
});
