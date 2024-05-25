document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#topnav ul li a:not(#goBack)');
    const sections = document.querySelectorAll('.content-section');
    const sidenavElement = document.getElementById('sidenav');
    const accountBtnTopbar = document.getElementById('accountBtnTopbar');
    const topnav = document.getElementById('topnav');
    const topnavContents = document.querySelectorAll('#topnav > *:not(.logo)');
    const logo = document.querySelector('#topnav img.logo');
    let sidebarOpened = false;

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

    function openSidebar() {
        sidenavElement.style.right = "0px";
        topnavContents.forEach(content => {
            content.style.transform = "translateX(-250px)";
        });
        accountBtnTopbar.classList.add('hide-account-icon');
        sidebarOpened = true;
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

    accountBtnTopbar.onclick = function() {
        if (!sidebarOpened) {
            openSidebar();
        } else {
            if (sidenavElement.style.right === "-250px") {
                sidenavElement.style.right = "0px";
                topnavContents.forEach(content => {
                    content.style.transform = "translateX(-250px)";
                });
                accountBtnTopbar.classList.add('hide-account-icon');
            } else {
                sidenavElement.style.right = "-250px";
                topnavContents.forEach(content => {
                    content.style.transform = "translateX(0)";
                });
                accountBtnTopbar.classList.remove('hide-account-icon');
            }
        }
    };

    document.addEventListener('click', function(e) {
        if (!sidenavElement.contains(e.target) && !accountBtnTopbar.contains(e.target)) {
            if (!sidebarOpened) {
                openSidebar();
            } else {
                sidenavElement.style.right = "-250px";
                topnavContents.forEach(content => {
                    content.style.transform = "translateX(0)";
                });
                accountBtnTopbar.classList.remove('hide-account-icon');
            }
        }
    });
});
