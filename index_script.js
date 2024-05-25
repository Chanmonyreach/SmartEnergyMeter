document.addEventListener('DOMContentLoaded', function() {
    const sidenavElement = document.getElementById('sidenav');
    const accountBtnTopbar = document.getElementById('menuBtn');
    const topnav = document.getElementById('topnav');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Set initial styles for elements
    sidenavElement.style.right = "-40%";

    // Event listener for sidebar toggle button
    if (accountBtnTopbar) {
        accountBtnTopbar.onclick = function() {
            if (sidenavElement.style.right === "-40%") {
                openSidebar();
            } else {
                closeSidebar();
            }
        };
    }

    // Close the sidebar when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!sidenavElement.contains(e.target) && !accountBtnTopbar.contains(e.target)) {
            closeSidebar();
        }
    });

    // Function to toggle the display of the login form
    if (document.getElementById('loginBtn')) {
        document.getElementById('loginBtn').onclick = function() {
            openLoginForm();
        }
    }

    // Function to toggle the display of the register form
    if (document.getElementById('sidenavRegisterBtn')) {
        document.getElementById('sidenavRegisterBtn').onclick = function() {
            openRegisterForm();
        }
    }

    // Close the forms when clicking outside of them
    document.addEventListener('click', function(event) {
        var Login_forms = document.getElementsByClassName('form-containerLog');
        var Register_forms = document.getElementsByClassName('form-containerReg');
        var loginBtn = document.getElementById('loginBtn');
        var registerBtn = document.getElementById('sidenavRegisterBtn');
        var clickedElement = event.target;
        var isLoginForm = (clickedElement.id === 'loginBtn' || clickedElement === loginBtn);
        var isRegisterForm = (clickedElement.id === 'sidenavRegisterBtn' || clickedElement === registerBtn);

        for (var i = 0; i < Login_forms.length; i++) {
            var Login_form = Login_forms[i];
            if (event.target != Login_form && !Login_form.contains(event.target) && !isLoginForm && !isRegisterForm) {
                Login_form.style.display = 'none';
            }
        }
        for (var i = 0; i < Register_forms.length; i++) {
            var Register_form = Register_forms[i];
            if (event.target != Register_form && !Register_form.contains(event.target) && !isLoginForm && !isRegisterForm) {
                Register_form.style.display = 'none';
            }
        }
    });

    function openSidebar() {
        sidenavElement.style.right = "0";
        topnav.style.right = "44%";
        accountBtnTopbar.style.display = "none";
    }

    function closeSidebar() {
        sidenavElement.style.right = "-40%";
        topnav.style.right = "4%";
        accountBtnTopbar.style.display = "block";
    }

    function openLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        closeSidebar();
    }

    function openRegisterForm() {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        closeSidebar();
    }
});
