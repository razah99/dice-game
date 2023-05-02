// Mettre à jour l'interface
function updateUI() {
    document.getElementById('player1Global').textContent = player1.globalScore; // Récupère le global score du joueur 1
    document.getElementById("player1Round").textContent = player1.roundScore;// Récupère le round score du joueur 1
    document.getElementById("player2Global").textContent = player2.globalScore;// Récupère le global score du joueur 2
    document.getElementById("player2Round").textContent = player2.roundScore;// Récupère le round score du joueur 2
    // Affiche les classes 'active' et 'point'
    if (activePlayer === player1) {
      document.querySelector("div.player1").classList.add("active");
      document.querySelector("div.point1").classList.add("point");
      document.querySelector("div.player2").classList.remove("active");
      document.querySelector("div.point2").classList.remove("point");
    } else {
      document.querySelector("div.player1").classList.remove("active");
      document.querySelector("div.point1").classList.remove("point");
      document.querySelector("div.player2").classList.add("active");
      document.querySelector("div.point2").classList.add("point");
    }
  }

  // Nouveau jeu, condition d'initialisation
function newGame() {
    player1.globalScore = 0;
    player1.roundScore = 0;
    player2.globalScore = 0;
    player2.roundScore = 0;
    activePlayer = player1;
    updateUI();
  }

  // Changement de joueur
function switchPlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
    updateUI();
  }

// Sélectionne la div existante pour afficher l'image
const imageDiv = document.getElementById("diceImage");

// Objet joueur 1
let player1 = {
    globalScore: 0,
    roundScore: 0,
    // Fonction pour lancer de dé
    rollDice: function () {
      let dice = Math.floor(Math.random() * 6) + 1; // Obtient un chiffre aléatoire entre 1 et 6
      // Fonction pour afficher l'image
      function displayImage() {
        const imageSrc = `img/image${dice}.png`; // Obtient le nom de l'image aléatoire
        const image = document.createElement("img"); // Crée un nouvel élément img
        image.src = imageSrc; // Définit l'attribut src de l'image avec le nom de l'image aléatoire
        imageDiv.innerHTML = ""; // Efface tout contenu existant dans la div
        imageDiv.appendChild(image);
      }
      displayImage(); // Appel de la fonction 'lancer le dé'
      // Condition de changement de joueur, perte des points obtenu non sauvegerder
      if (dice === 1) {
        this.roundScore = 0;
        switchPlayer();
      } else {
        this.roundScore += dice;
      }
    },
    // Fonction de sauvegarde des points 
    holdScore: function () {
      this.globalScore += this.roundScore;
      this.roundScore = 0;
      if (this.globalScore >= 100) {
        alert("Player 1 wins!");
        newGame();
      } else {
        switchPlayer();
      }
    }
  };
  
  // Objet joueur 2
  let player2 = {
    globalScore: 0,
    roundScore: 0,
    // Fonction pour lancer le dé
    rollDice: function () {
      let dice = Math.floor(Math.random() * 6) + 1; // Obtient un chiffre aléatoire entre 1 et 6
      function displayImage() {
        const imageSrc = `img/image${dice}.png`; // Obtient le nom de l'image aléatoire
        const image = document.createElement("img"); // Crée un nouvel élément img
        image.src = imageSrc; // Définit l'attribut src de l'image avec le nom de l'image aléatoire
        imageDiv.innerHTML = ""; // Efface tout contenu existant dans la div
        imageDiv.appendChild(image);
      }
      displayImage(); // Appel de la fonction 'lancer le dé'
      // Condition de changement de joueur, perte des points obtenu non sauvegerder
      if (dice === 1) {
        this.roundScore = 0;
        switchPlayer();
      } else {
        this.roundScore += dice;
      }
    },
    // Fonction de sauvegarde des points 
    holdScore: function () {
      this.globalScore += this.roundScore;
      this.roundScore = 0;
      if (this.globalScore >= 100) {
        alert("Player 2 wins!");
        newGame();
      } else {
        switchPlayer();
      }
    }
  };
  
  let activePlayer = player1;
  
  // Écoute de l'élément rollDice
  document.getElementById("rollDice").addEventListener("click", function () {
    activePlayer.rollDice();
    updateUI();
  });

    // Écoute de l'élément holdScore
  document.getElementById("holdScore").addEventListener("click", function () {
    activePlayer.holdScore();
    updateUI();
  });

    // Écoute de l'élément newGame
  document.getElementById("newGame").addEventListener("click", function () {
    newGame();
  });