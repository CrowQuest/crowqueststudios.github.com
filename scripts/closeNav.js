document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Función para cerrar la barra de navegación
    function cerrarNavbar() {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }

    // Evento para cerrar la barra de navegación al hacer clic fuera de ella
    document.addEventListener('click', function(event) {
        const target = event.target;
        const isNavbarToggler = target === navbarToggler || navbarToggler.contains(target);
        const isNavbarCollapse = target === navbarCollapse || navbarCollapse.contains(target);

        if (!isNavbarToggler && !isNavbarCollapse) {
            cerrarNavbar();
        }
    });

    // Evento para cerrar la barra de navegación al hacer clic en un enlace de la barra de navegación
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (!link.classList.contains('dropdown-toggle')) {
                cerrarNavbar();
            }
        });
    });
});
