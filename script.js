document.addEventListener('DOMContentLoaded', () => {
  
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  
  if ('IntersectionObserver' in window) {
    const timelineItems = document.querySelectorAll('.timeline-item.reveal-animation');
    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);  
        }
      });
    }, observerOptions);

    timelineItems.forEach(item => {
      observer.observe(item);
    });
  } else {
    
    const timelineItems = document.querySelectorAll('.timeline-item.reveal-animation');
    timelineItems.forEach(item => {
      item.classList.add('revealed');
    });
  }
});
    
    
    const body = document.querySelector('body');
    
    if (!document.querySelector('.mobile-menu-toggle')) {
        
        const mobileMenuToggle = document.createElement('div');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const navRight = document.querySelector('.nav-right');
        const navContainer = document.querySelector('nav');
        
        if (navRight) {
            navContainer.insertBefore(mobileMenuToggle, navRight);
        } else {
            navContainer.appendChild(mobileMenuToggle);
        }
       
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        
        const navLinks = document.querySelector('.nav-links').cloneNode(true);
        mobileMenu.appendChild(navLinks);
        
       
        if (navRight) {
            const navRightButtons = navRight.querySelectorAll('button');
            navRightButtons.forEach(button => {
                const clonedButton = button.cloneNode(true);
                mobileMenu.appendChild(clonedButton);
            });
        }
        
        body.appendChild(mobileMenu);
        
    
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            
        
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg)';
                spans[0].style.top = '8px';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg)';
                spans[2].style.top = '8px';
            } else {
                spans[0].style.transform = 'rotate(0)';
                spans[0].style.top = '0px';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0)';
                spans[2].style.top = '16px';
            }
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('open');
                body.classList.remove('menu-open');
                
               
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0)';
                spans[0].style.top = '0px';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0)';
                spans[2].style.top = '16px';
            });
        });
    }
