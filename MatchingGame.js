const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 10;

// Link text
playerLivesCount.textContent = playerLives;

// Generate the data
const getData = () => [
    { imgSrc: "images/Hashirama.jpeg", name: "Hashirama"},
    { imgSrc: "images/Hinata.jpeg", name: "Hinata"},
    { imgSrc: "images/Itachi.jpeg", name: "Itachi"},
    { imgSrc: "images/Madara.jpeg", name: "Madara"},
    { imgSrc: "images/Minato.jpeg", name: "Minato"},
    { imgSrc: "images/Naruto.jpeg", name: "Naruto"},
    { imgSrc: "images/Sakura.jpeg", name: "Sakura"},
    { imgSrc: "images/Sasuke.jpeg", name: "Sasuke"},
    { imgSrc: "images/Hashirama.jpeg", name: "Hashirama"},
    { imgSrc: "images/Hinata.jpeg", name: "Hinata"},
    { imgSrc: "images/Itachi.jpeg", name: "Itachi"},
    { imgSrc: "images/Madara.jpeg", name: "Madara"},
    { imgSrc: "images/Minato.jpeg", name: "Minato"},
    { imgSrc: "images/Naruto.jpeg", name: "Naruto"},
    { imgSrc: "images/Sakura.jpeg", name: "Sakura"},
    { imgSrc: "images/Sasuke.jpeg", name: "Sasuke"},
];

// Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// Card Generator 
const cardGenerator = () => {
    const cardData = randomize();
// Generate html
    cardData.forEach(item => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        //Attach the card to the section 
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};
// Check card
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    if(flippedCards.length === 2){
        if(
            flippedCards[0].getAttribute('name') === 
            flippedCards[1].getAttribute('name')){
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");  
                card.style.pointerEvents = "none";
            });
        } else {
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("👎😐 sorry, try again")
            }
        }
    }
    // Run if we won the game 
    if (toggleCard.length === 16) {
        restart("🤙🏆🎊 congrats, you won. ");
    }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 10;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100)
};


cardGenerator();