// Select all list items (the student cards)
const studentCards = document.querySelectorAll('.cardlayout li');

// for each card look for the favorite animal and assign the function of the mouseenter and mouseleave to it
studentCards.forEach(card => {

    const img = card.querySelector(".favanimal");
    const audio = card.querySelector(".animalsound");

    // Check if both exist to avoid errors
    if (img && audio) {
        img.addEventListener("mouseenter", () => {
            audio.play()
        });

        img.addEventListener("mouseleave", () => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
});

const cards = document.querySelectorAll('.card'); 

cards.forEach(card => {
    card.addEventListener('mousemove', event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Set CSS variables for the spotlight position
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

const filter = document.querySelector(".filter");
const showfilters = document.querySelector(".filterbutton")

showfilters.addEventListener('click', () => {
    filter.classList.toggle("open");
});