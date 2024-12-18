const questions = [
    {
      question: "Quelle est la capitale de l'Italie ?",
      options: ["Rome", "Venise", "Florence"],
      answer: "Rome", 
      imageSrc: "images/capital d'italie.jpg"
    },
    {
      question: "Quel est l'océan le plus grand du monde ?",
      options: ["Océan Atlantique", "Océan Pacifique", "Océan Indien"],
      answer: "Océan Pacifique",
      imageSrc: "images/ocean.jpg"
    },
    {
      question: "Quel est l'auteur des Fables de La Fontaine ?",
      options: ["Jean de La Fontaine", "Victor Hugo", "Molière"],
      answer: "Jean de La Fontaine",
      imageSrc: "images/La_Fontaine_-_Fables,_Bernardin-Bechet,_1874_p0006.png"
    },
    {
      question: "Quel est le sommet le plus élevé du monde ?",
      options: ["Mont Everest", "Mont Kilimandjaro", "Mont Blanc"],
      answer: "Mont Everest",
      imageSrc: "images/sommet-plus-haut.jpg"
    },
    {
      question: "Quel pays est célèbre pour les pyramides ?",
      options: ["Égypte", "Mexique", "Inde"],
      answer: "Égypte",
      imageSrc: "images/pyramide-Egypte.jpg"
    },
    {
      question: "Quelle est l'année de la Révolution française ?",
      options: ["1789", "1815", "1914"],
      answer: "1789",
      imageSrc: "images/révolution francaise.jpg"
    },
    {
      question: "Quelle planète est la plus proche du Soleil ?",
      options: ["Mercure", "Vénus", "Mars"],
      answer: "Mercure",
      imageSrc: "images/terre-soleil.jpeg"
    },
    {
      question: "Qui a peint 'La Nuit étoilée' ?",
      options: ["Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
      answer: "Vincent van Gogh",
      imageSrc: "images/la-nuit-etoilee-vincent-van-gogh-1889.jpg"
    },
    {
      question: "Quelle est la langue officielle du Brésil ?",
      options: ["Portugais", "Espagnol", "Français"],
      answer: "Portugais",
      imageSrc: "images/6.-Tetyana-Rusanova-1024x681.png"
    },
    {
      question: "Quel est le plus grand désert du monde ?",
      options: ["Désert du Sahara", "Désert d'Arabie", "Désert de Gobi"],
      answer: "Désert du Sahara",
      imageSrc: "images/desert.jpeg"
    },
    {
      question: "Qui a écrit 'Les Misérables' ?",
      options: ["Victor Hugo", "Émile Zola", "Alexandre Dumas"],
      answer: "Victor Hugo",
      imageSrc: "images/istockphoto-1784098951-612x612.jpg"
    },
    {
      question: "Quelle est la monnaie utilisée au Japon ?",
      options: ["Yen", "Dollar", "Euro"],
      answer: "Yen",
      imageSrc: "images/INDEX.jpeg"
    },
    {
      question: "Quelle est la durée d'une année bissextile ?",
      options: ["366 jours", "365 jours", "364 jours"],
      answer: "366 jours",
      imageSrc: "images/INDEX.jpeg"
    },
    {
      question: "Quelle est la distance entre la Terre et la Lune ?",
      options: ["384 400 km", "150 000 km", "1 000 000 km"],
      answer: "384 400 km",
      imageSrc: "images/lune-terre.jpg"
    },
    {
      question: "Quelle est la première lettre de l'alphabet grec ?",
      options: ["Alpha", "Bêta", "Gamma"],
      answer: "Alpha",
      imageSrc: "images/maxresdefault.jpg"
    }
];
  
  
  let currentQuestionIndex = 0;//Indice de la question actuellement affichée
  let score = 0;//Score de l'utilisateur (nombre de bonnes réponses).
  let userAnswers = [];//Tableau pour stocker les réponses de l'utilisateur


  //Ces constantes pointent vers des éléments HTML du DOM grâce à leurs ID respectifs, pour manipuler ou afficher les données du quiz.
  const questionContainer = document.getElementById("question-container");
  const nextBtn = document.getElementById("next-btn");
  const scoreModal = document.getElementById("score-modal");
  const scoreText = document.getElementById("score");
  const scoreFeedback = document.getElementById("score-feedback");
  const correctAnswersList = document.getElementById("correct-answers-list");
  const restartBtn = document.getElementById("restart-btn");
  const answerGrid = document.getElementById("answer-grid");
  const quizImage = document.getElementById("quiz-image");
  
  function showQuestion(index) {//Fonction qui affiche une question donnée.
    const question = questions[index];//Récupère la question à l'indice spécifié.
  
    
    quizImage.src = question.imageSrc;//Change la source de l'image pour correspondre à la question actuelle.
  
    questionContainer.innerHTML = `
      <h2>${index + 1}. ${question.question}</h2>
    `;//Affiche le texte de la question dans le conteneur prévu.
  
    
    answerGrid.innerHTML = question.options  //Génère les options sous forme de boutons radio (un par choix)
      .map((option, i) => {
        return `<label><input type="radio" name="answer" value="${option}"> ${option}</label>`;
      })
      .join("");
  }
  
  function updateProgressBar() { //Calcule et met à jour la largeur de la barre de progression en fonction des questions déjà répondues.
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex / questions.length) * 100).toFixed(0);
    progressBar.style.width = `${progress}%`;
  }
  
  function showScore() {//Calcule et affiche le pourcentage de bonnes réponses.
    const percentage = ((score / questions.length) * 100).toFixed(0);
    document.getElementById("score-display").innerText = `${percentage}%`;
  
    // Personalized feedback
    if (percentage >= 80) {
      scoreFeedback.innerText = "Excellent work! 🎉";
      scoreFeedback.style.color = "#4caf50";
    } else if (percentage >= 50) {
      scoreFeedback.innerText = "Good job, but you can do better! 👍";
      scoreFeedback.style.color = "#ffc107";
    } else {
      scoreFeedback.innerText = "Keep practicing! 💪";
      scoreFeedback.style.color = "#f44336";
    }
  
    // Show correct answers
    correctAnswersList.innerHTML = questions
      .map(
        (q, i) => `<li>${i + 1}. ${q.question} - <b>Correct Answer:</b> ${q.answer}</li>`
      )
      .join("");
  
    scoreModal.style.display = "flex";
  }
  
  function restartQuiz() {//Réinitialise les variables globales et cache le modal de score pour recommencer le quiz.
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    scoreModal.style.display = "none";
    showQuestion(currentQuestionIndex);
    updateProgressBar();
  }
  
  nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (selectedOption) {
      const answer = selectedOption.value;
      userAnswers.push(answer);
      if (answer === questions[currentQuestionIndex].answer) score++;
      currentQuestionIndex++;
      updateProgressBar();
      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
      } else {
        showScore();
      }
    } else {
      alert("Please select an answer!");
    }
  });
  
  restartBtn.addEventListener("click", restartQuiz);
  
  // Initialize quiz
  showQuestion(currentQuestionIndex);
  updateProgressBar();