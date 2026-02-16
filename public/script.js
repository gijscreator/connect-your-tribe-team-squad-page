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