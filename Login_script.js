document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#topnav ul li a:not(#Login)');
    const sections = document.querySelectorAll('.content-section');
    const sidenavElement = document.getElementById('sidenav');
    const accountBtnTopbar = document.getElementById('accountBtnTopbar');
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

    sidenavElement.style.right = "-250px";

    accountBtnTopbar.onclick = function() {
        if (sidenavElement.style.right === "-250px") {
            sidenavElement.style.right = "0px";
            topnav.style.right = "280px"; // Adjust the value based on the width of the sidebar
        } else {
            sidenavElement.style.right = "-250px";
            topnav.style.right = "30px"; // Reset the position of the topnav when the sidebar is closed
        }
    };

    // Close the sidebar when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!sidenavElement.contains(e.target) && !accountBtnTopbar.contains(e.target)) {
            sidenavElement.style.right = "-250px";
            topnav.style.right = "30px"; // Reset the position of the topnav when the sidebar is closed
        }
    });
});
