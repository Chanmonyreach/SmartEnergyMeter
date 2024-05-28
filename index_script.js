document.addEventListener('DOMContentLoaded', function() {
    const sidenavElement = document.getElementById('sidenav');
    const accountBtnTopbar = document.getElementById('menuBtn');
    const topnav = document.getElementById('topnav');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('sidenavRegisterBtn');
    const menuBtn = document.getElementById('menuBtn');
    const registerSubmitBtn = document.querySelector('#registerForm button[type="submit"]');
    const usernameInput = document.getElementById('newUsername');
    const usernameAvailability = document.getElementById('usernameAvailability');
    const registerButton = document.getElementById('registerForm_button');

    // Set initial styles for elements
    sidenavElement.style.right = "-40%";

    // Event listener for sidebar toggle button
    if (accountBtnTopbar) {
        accountBtnTopbar.onclick = toggleSidebar;
    }

    // Close the sidebar when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!sidenavElement.contains(e.target) && !accountBtnTopbar.contains(e.target)) {
            closeSidebar();
        }
    });

    // Function to toggle the sidebar
    function toggleSidebar() {
        const isOpen = sidenavElement.style.right === '0px';
        sidenavElement.style.right = isOpen ? '-40%' : '0px';
        topnav.style.right = isOpen ? '4%' : '44%';
        accountBtnTopbar.style.display = isOpen ? 'block' : 'none';
    }

    // Function to toggle the display of the login form
    if (loginBtn) {
        loginBtn.onclick = function() {
            openLoginForm();
        }
    }

    // Function to toggle the display of the register form
    if (registerBtn) {
        registerBtn.onclick = function() {
            openRegisterForm();
        }
    }

    // Close the forms when clicking outside of them
    document.addEventListener('click', function(event) {
        var Login_forms = document.getElementsByClassName('form-containerLog');
        var Register_forms = document.getElementsByClassName('form-containerReg');
        var clickedElement = event.target;
        var isLoginForm = (clickedElement.id === 'loginBtn' || clickedElement === loginBtn);
        var isRegisterForm = (clickedElement.id === 'sidenavRegisterBtn' || clickedElement === registerBtn);

        for (var i = 0; i < Login_forms.length; i++) {
            var Login_form = Login_forms[i];
            if (event.target != Login_form && !Login_form.contains(event.target) && !isLoginForm && !isRegisterForm) {
                Login_form.style.display = 'none';
                resetForm(Login_form.querySelector('form'));
            }
        }
        for (var i = 0; i < Register_forms.length; i++) {
            var Register_form = Register_forms[i];
            if (event.target != Register_form && !Register_form.contains(event.target) && !isLoginForm && !isRegisterForm) {
                Register_form.style.display = 'none';
                resetForm(Register_form.querySelector('form'));
            }
        }
    });

    function closeSidebar() {
        sidenavElement.style.right = "-40%";
        topnav.style.right = "4%";
        accountBtnTopbar.style.display = "block";
    }

    function openLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        resetForm(loginForm.querySelector('form'));
        closeSidebar();
    }

    function openRegisterForm() {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        resetForm(registerForm.querySelector('form'));
        closeSidebar();
    }

    function resetForm(form) {
        form.reset();
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            loginForm.classList.toggle("active");
            registerForm.classList.remove("active");
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            registerForm.classList.toggle("active");
            loginForm.classList.remove("active");
        });
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            sidenav.classList.toggle("open");
        });
    }

    // Add event listener to check username availability while typing
    usernameInput.addEventListener('input', function() {
        const newUsername = usernameInput.value;

        // Perform an AJAX request to check if the username exists
        if(registerSubmitBtn.disabled == true){
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'check_username.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.exists) {
                            // Username already exists, show error message
                            usernameAvailability.textContent = " *unavailable.";
                            usernameAvailability.style.color = "red";
                            // Add animation class to the register button
                            registerSubmitBtn.classList.add('shake-animation');
                            registerSubmitBtn.disabled = true;
                        } else {
                            // Username does not exist, show success message
                            usernameAvailability.textContent = " *available.";
                            usernameAvailability.style.color = "green";
                            // Remove animation class from the register button
                            registerSubmitBtn.classList.remove('shake-animation');
                            registerSubmitBtn.disabled = false;
                        }
                    } else {
                        console.error('Error checking username:', xhr.status);
                    }
                }
            };
            xhr.send('username=' + newUsername);
        } else {
            // Send the AJAX request if the register button is enabled
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'check_username.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.exists) {
                            // Username already exists, show error message
                            usernameAvailability.textContent = " *unavailable.";
                            usernameAvailability.style.color = "red";
                            // Add animation class to the register button
                            registerSubmitBtn.classList.add('shake-animation');
                            registerSubmitBtn.disabled = true;
                        } else {
                            // Username does not exist, show success message
                            usernameAvailability.textContent = " *available.";
                            usernameAvailability.style.color = "green";
                            // Remove animation class from the register button
                            registerSubmitBtn.classList.remove('shake-animation');
                            registerSubmitBtn.disabled = false;
                        }
                    } else {
                        console.error('Error checking username:', xhr.status);
                    }
                }
            };
            xhr.send('username=' + newUsername);
        }
    });

});
