document.addEventListener('DOMContentLoaded', function() {
    const sidenavElement = document.getElementById('sidenav');
    const accountBtnTopbar = document.getElementById('menuBtn');
    const accountBtnSidebar = document.getElementById('accountBtnSidebar');
    const topnav = document.getElementById('topnav');
    const menuBtn = document.getElementById("menuBtn");
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Set initial styles for elements
    sidenavElement.style.right = "-250px";

    // Event listener for sidebar toggle button
    menuBtn.onclick = function() {
        if (sidenavElement.style.right == "-250px") {
            sidenavElement.style.right = "0px";
        } else {
            sidenavElement.style.right = "-250px";
        }
    };

    // Event listener for topbar account button
    accountBtnTopbar.onclick = function() {
        if (sidenavElement.style.right === "-250px") {
            sidenavElement.style.right = "0px";
            topnav.style.right = "280px"; // Adjust the value based on the width of the sidebar
            accountBtnTopbar.style.display = "none";
            accountBtnSidebar.style.display = "block";
        } else {
            sidenavElement.style.right = "-250px";
            topnav.style.right = "30px"; // Reset the position of the topnav when the sidebar is closed
            accountBtnTopbar.style.display = "block";
            accountBtnSidebar.style.display = "none";
        }
    };

    // Close the sidebar when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!sidenavElement.contains(e.target) && !accountBtnTopbar.contains(e.target)) {
            sidenavElement.style.right = "-250px";
            topnav.style.right = "30px"; // Reset the position of the topnav when the sidebar is closed
            accountBtnTopbar.style.display = "block";
            accountBtnSidebar.style.display = "none";
        }
    });

    // Function to toggle the display of the login form
    document.getElementById('loginBtn').onclick = function() {
        if (loginForm.style.display !== 'block') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else if (registerForm.style.display === 'block') {
            registerForm.style.display = 'none';
        }
    }

    // Function to toggle the display of the register form
    document.getElementById('sidenavRegisterBtn').onclick = function() {
        if (sidenavElement.style.right === "0px" && registerForm.style.display !== 'block') {
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
            sidenavElement.style.right = "-250px"; // Close the sidebar
        } else if (loginForm.style.display === 'block') {
            loginForm.style.display = 'none';
        }
    }

    // Close the forms when clicking outside of them
    document.addEventListener('click', function(event) {
        var forms = document.getElementsByClassName('form-container');
        var loginBtn = document.getElementById('loginBtn');
        var registerBtn = document.getElementById('sidenavRegisterBtn');
        var clickedElement = event.target;
        var isLoginForm = (clickedElement.id === 'loginBtn' || clickedElement === loginBtn);
        var isRegisterForm = (clickedElement.id === 'sidenavRegisterBtn' || clickedElement === registerBtn);

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            if (event.target != form && !form.contains(event.target) && !isLoginForm && !isRegisterForm) {
                form.style.display = 'none';
            }
        }
    });
});
