document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.add('py-4');
            header.classList.remove('py-2');
        }
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
             mobileMenu.classList.add('hidden');
        });
    });


    const heroImages = [
        { src: 'img/Wizerunek-żyrafy.webp', alt: 'Druk ścienny w artystycznej sypialni' },
        { src: 'img/Powstanie-Adama.webp', alt: 'Druk ścienny Powstania Adama w szkole' },
        { src: 'img/Tajemnicza-Solina.webp', alt: 'Druk ścienny sali zabaw Tajemnicza Solina' },
        { src: 'img/Radha-i-Kryszna.webp', alt: 'Druk ścienny Radhy i Kryszny w restauracji' }
    ];
    let currentImageIndex = 0;
    const heroImageElement = document.getElementById('hero-image');

    function changeHeroImage() {
        heroImageElement.style.opacity = '0';
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImageElement.src = heroImages[currentImageIndex].src;
            heroImageElement.alt = heroImages[currentImageIndex].alt;
            heroImageElement.style.opacity = '1';
        }, 1000); // Czas na płynne przejście
    }
    setInterval(changeHeroImage, 5000); // Zmieniaj obraz co 5 sekund


    // Zaktualizowana lista obrazów z różnymi układami (layout) i proporcjami
    const allPortfolioImages = [
        { src: 'img/M4Wind1.webp', alt: 'Druk ścienny w nowoczesnym biurze', category: 'biura-i-firmy', layout: 'normal' },
        { src: 'img/Mapa-miasta-Gryfino.webp', alt: 'Druk ścienny w recepcji firmy', category: 'biura-i-firmy', layout: 'normal' },
        { src: 'img/Powstanie-Adama.webp', alt: 'Druk ścienny Powstania Adama w szkole', category: 'szkoly', layout: 'normal' },
        { src: 'img/Szkoła-Podstawowa-w-Goleniowie.webp', alt: 'Druk ścienny w korytarzu szkolnym', category: 'szkoly', layout: 'normal' },
        { src: 'img/Niedzwiedź-na-ścianie.webp', alt: 'Druk ścienny niedźwiedzia w pokoju dziecięcym', category: 'mieszkania', layout: 'normal' },
        { src: 'img/Abstrakcja-w-salonie.webp', alt: 'Druk ścienny abstrakcji w salonie', category: 'mieszkania', layout: 'normal' },
        { src: 'img/Buggy-na-ścianie.webp', alt: 'Druk ścienny samochodu Buggy w pokoju dziecięcym', category: 'mieszkania', layout: 'normal' },
        { src: 'img/Szkoła-Otwock.webp', alt: 'Druk ścienny okna w ścianie w szkole', category: 'miejsca-publiczne', layout: 'normal' },
        { src: 'img/Wizerunek-żyrafy.webp', alt: 'Druk ścienny wizerunku żyrafy w artystycznej sypialni', category: 'mieszkania', layout: 'normal' },
        { src: 'img/Zwierzęta-leśne.webp', alt: 'Druk ścienny zwierząt leśnych w pokoju dziecięcym', category: 'mieszkania', layout: 'normal' },
        { src: 'img/Bawilandia.webp', alt: 'Druk ścienny w sali zabaw Bawilandii', category: 'miejsca-publiczne', layout: 'normal' },
        { src: 'img/Radha-i-Kryszna.webp', alt: 'Druk ścienny Radhy i Kryszny w restauracji', category: 'miejsca-publiczne', layout: 'normal' },
        { src: 'img/Tajemnicza-Solina.webp', alt: 'Druk ścienny sali zabaw Tajemnicza Solina', category: 'miejsca-publiczne', layout: 'normal' },
    ];

    const gallery = document.getElementById('gallery');
    const filterButtons = document.querySelectorAll('.filter-button');

    function displayGallery(category) {
        gallery.innerHTML = ''; // Wyczyść galerię
        let filteredImages = allPortfolioImages;

        if (category !== 'wszystkie') {
            filteredImages = allPortfolioImages.filter(img => img.category === category);
        }

        filteredImages.forEach(img => {
            const div = document.createElement('div');
            let layoutClasses = '';
            let aspectRatioClass = '';

            // Określ klasy Tailwind na podstawie właściwości 'layout' obrazu
            switch (img.layout) {
                case 'wide':
                    layoutClasses = 'md:col-span-2'; // Rozciągnij na 2 kolumny na średnich ekranach i większych
                    aspectRatioClass = 'aspect-w-16 aspect-h-9'; // Szeroki współczynnik proporcji
                    break;
                case 'tall':
                    layoutClasses = 'md:row-span-2'; // Rozciągnij na 2 rzędy na średnich ekranach i większych
                    aspectRatioClass = 'aspect-w-3 aspect-h-4'; // Wysoki współczynnik proporcji
                    break;
                case 'normal':
                default:
                    layoutClasses = ''; // Brak specjalnego rozciągania
                    aspectRatioClass = 'aspect-w-4 aspect-h-3'; // Standardowy współczynnik proporcji
                    break;
            }

            // Zastosuj klasy do kontenera obrazu
            div.className = `group relative overflow-hidden rounded-lg shadow-lg cursor-pointer ${aspectRatioClass} ${layoutClasses}`;
            div.innerHTML = `
                <img src="${img.src}" alt="${img.alt}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <p class="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">${img.alt.split('-')[0].trim()}</p>
                </div>
            `;
            div.addEventListener('click', () => openModal(img.src, img.alt));
            gallery.appendChild(div);
        });
    }

    // Dodaj event listener dla każdego przycisku filtra
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            // Zmień aktywne style przycisków
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-blue-100', 'hover:text-blue-700');
            });
            button.classList.add('bg-blue-500', 'text-white');
            button.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-blue-100', 'hover:text-blue-700');
            displayGallery(category);
        });
    });

    // Wyświetl wszystkie obrazy przy pierwszym ładowaniu
    displayGallery('wszystkie');


    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCloseButton = document.getElementById('modal-close-button');

    function openModal(src, alt) {
        modalImage.src = src;
        modalImage.alt = alt;
        modalImage.classList.add('object-contain');
        imageModal.classList.remove('opacity-0', 'pointer-events-none');
        imageModal.classList.add('fade-in');
    }

    function closeModal() {
        imageModal.classList.add('opacity-0', 'pointer-events-none');
        modalImage.classList.remove('object-contain', 'object-cover');
    }
    modalCloseButton.addEventListener('click', closeModal);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModal();
        }
    });



    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('form-success-modal');
    const successModalClose = document.getElementById('form-success-close');
    const errorModal = document.getElementById('form-error-modal'); 
    const errorModalClose = document.getElementById('form-error-close');
    const errorMessageText = document.getElementById('error-message-text');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Formularz został wysłany. Rozpoczynam walidację.");

        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });

        if (isValid) {
            console.log("Walidacja formularza przeszła pomyślnie.");
            const formData = new FormData(contactForm);
            const backendUrl = 'send.php';

            console.log("Wysyłanie zapytania do PHP backendu na adres:", backendUrl);
            try {
                const response = await fetch(backendUrl, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    console.log("Odpowiedź z serwera: Sukces.");
                    successModal.classList.remove('opacity-0', 'pointer-events-none');
                    successModal.classList.add('fade-in');
                } else {
                    console.log("Odpowiedź z serwera: Błąd:", result.message);
                    errorMessageText.textContent = result.message || 'Wystąpił nieznany błąd podczas wysyłania formularza.';
                    errorModal.classList.remove('opacity-0', 'pointer-events-none');
                    errorModal.classList.add('fade-in');
                }
            } catch (error) {
                console.error('Błąd sieci lub serwera:', error);
                errorMessageText.textContent = 'Błąd połączenia z serwerem. Spróbuj ponownie później.';
                errorModal.classList.remove('opacity-0', 'pointer-events-none');
                errorModal.classList.add('fade-in');
            } finally {
                console.log("Zakończono proces wysyłki formularza.");
            }
        } else {
            console.log("Walidacja formularza nie powiodła się. Uzupełnij wymagane pola.");
        }
    });

    successModalClose.addEventListener('click', () => {
        successModal.classList.add('opacity-0', 'pointer-events-none');
        contactForm.reset();
    });

    errorModalClose.addEventListener('click', () => {
        errorModal.classList.add('opacity-0', 'pointer-events-none');
    });

    errorModal.addEventListener('click', (e) => {
        if (e.target === errorModal) {
            errorModal.classList.add('opacity-0', 'pointer-events-none');
        }
    });
});

