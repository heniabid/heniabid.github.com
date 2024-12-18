function calculateScore() {
    const correctAnswers = {
        q1: 'A',
        q2: 'B',
        q3: 'A'
    };
    
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let resultText = `<h3>Résultats :</h3>`;
    for (let question in correctAnswers) {
        let selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        let questionElement = document.querySelector(`input[name="${question}"]`).parentElement;
        
        if (selectedOption) {
            if (selectedOption.value === correctAnswers[question]) {
                score++;
                selectedOption.parentElement.style.color = "green";
            } else {
                selectedOption.parentElement.style.color = "red";
                resultText += `<p>${question} : <span style="color:green">Réponse correcte - ${correctAnswers[question]}</span></p>`;
            }
        } else {
            resultText += `<p>${question} : <span style="color:green">Réponse correcte - ${correctAnswers[question]}</span></p>`;
        }
    }
    resultText = `<p>Votre score : ${score} / ${totalQuestions}</p>` + resultText;
    document.getElementById("quiz-result").innerHTML = resultText;
}