document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#topnav ul li a:not(#goBack)');
    const sections = document.querySelectorAll('.content-section');
    const topnav = document.getElementById('topnav');

    function setActiveLink(link) {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    }

    function setActiveSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const activeSection = document.querySelector('.content-section.active');
            const targetSection = document.getElementById(link.getAttribute('data-section'));

            if (activeSection !== targetSection) {
                const isMovingLeft = Array.from(sections).indexOf(targetSection) < Array.from(sections).indexOf(activeSection);

                activeSection.classList.add(isMovingLeft ? 'right-out' : 'left-out');
                targetSection.classList.add(isMovingLeft ? 'left-in' : 'right-in');

                setTimeout(() => {
                    activeSection.classList.remove('active', 'right-out', 'left-out');
                    targetSection.classList.add('active');
                    targetSection.classList.remove('right-in', 'left-in');
                }, 500);

                setActiveLink(link);
            }
        });
    });

    // Redirect to main.html when clicking on the Login link
    const loginLink = document.querySelector('#topnav ul li a[href="index.html"]');
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = "index.html";
    });

});
