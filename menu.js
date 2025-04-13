document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Função para fechar todos os menus exceto o atual
  function closeOtherMenus(currentDropdown) {
    dropdowns.forEach(dropdown => {
      if (dropdown !== currentDropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        const submenu = dropdown.querySelector('.dropdown-submenu');
        const link = dropdown.querySelector('a');
        if (menu) menu.classList.remove('show');
        if (submenu) submenu.classList.remove('show');
        if (link) link.classList.remove('active');
      }
    });
  }

  // Toggle do menu mobile
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('show');
      this.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      if (!navMenu.classList.contains('show')) {
        closeOtherMenus();
      }
    });
  }

  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!e.target.closest('nav')) {
      navMenu.classList.remove('show');
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      closeOtherMenus();
    }
  });

  // Manipulação dos dropdowns
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (link && menu) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 767) {
          e.preventDefault();
          e.stopPropagation();
          
          // Fecha outros dropdowns do mesmo nível
          closeOtherMenus(dropdown);

          // Toggle do menu atual
          menu.classList.toggle('show');
          this.classList.toggle('active');
        }
      });
    }

    // Manipulação dos submenus
    const subDropdowns = dropdown.querySelectorAll('.dropdown');
    subDropdowns.forEach(subDropdown => {
      const subLink = subDropdown.querySelector('a');
      const submenu = subDropdown.querySelector('.dropdown-submenu');
      
      if (subLink && submenu) {
        subLink.addEventListener('click', function(e) {
          if (window.innerWidth <= 767) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle do submenu atual
            submenu.classList.toggle('show');
            this.classList.toggle('active');
          }
        });
      }
    });
  });

  // Prevenir que cliques dentro do menu fechem o menu mobile
  navMenu.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Ajuste do menu ao redimensionar a janela
  window.addEventListener('resize', function() {
    if (window.innerWidth > 767) {
      navMenu.classList.remove('show');
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      closeOtherMenus();
    }
  });
});