// انتظر حتى يتم تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تغيير لون الهيدر عند التمرير
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // إضافة زر القائمة للشاشات الصغيرة
    const header_container = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    // إنشاء زر القائمة
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // إضافة زر القائمة إلى الهيدر
    header_container.insertBefore(menuToggle, nav);
    
    // تفعيل/إلغاء تفعيل القائمة عند النقر على الزر
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // تغيير أيقونة الزر
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // إغلاق القائمة عند النقر على أي رابط
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // معالجة نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود للتحقق من صحة البيانات وإرسالها
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // عرض رسالة نجاح (يمكن استبدالها بإرسال البيانات إلى الخادم)
            alert(`شكراً ${name} على تواصلك معنا! سنقوم بالرد عليك قريباً.`);
            contactForm.reset();
        });
    }
    
    // تكبير صور المعرض عند النقر عليها
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgCaption = this.querySelector('.gallery-caption').textContent;
            
            // إنشاء عنصر العرض المكبر
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="${imgCaption}">
                    <p class="lightbox-caption">${imgCaption}</p>
                </div>
            `;
            
            // إضافة العنصر إلى الصفحة
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // إغلاق العرض المكبر عند النقر على زر الإغلاق أو خارج الصورة
            const closeLightbox = document.querySelector('.close-lightbox');
            closeLightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    
    // إضافة تأثيرات ظهور العناصر عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .prototype-content, .gallery-item, .contact-content, .download-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // تشغيل التأثير عند تحميل الصفحة وعند التمرير
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // تحميل الصور بشكل متأخر لتحسين أداء الصفحة
    const lazyLoadImages = function() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight + 100) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    };
    
    window.addEventListener('load', lazyLoadImages);
    window.addEventListener('scroll', lazyLoadImages);
});

// إضافة CSS للعناصر الديناميكية
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border: 3px solid white;
        }
        
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 30px;
            color: white;
            cursor: pointer;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.7);
        }
        
        /* تأثيرات الظهور */
        .feature-card, .prototype-content, .gallery-item, .contact-content, .download-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .prototype-content.animate, .gallery-item.animate, .contact-content.animate, .download-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .gallery-item {
            transition-delay: calc(0.1s * var(--i));
        }
    </style>
`);
