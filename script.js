const questions = [
  {
    "question": "For this question, refer to the EHR Healthcare case study. You are responsible for ensuring that EHR's use of Google Cloud will pass an upcoming privacy compliance audit. What should you do? (Choose two.)",
    "options": [
      "Verify EHR's product usage against the list of compliant products on the Google Cloud compliance page.",
      "Advise EHR to execute a Business Associate Agreement (BAA) with Google Cloud.",
      "Use Firebase Authentication for EHR's user facing applications.",
      "Implement Prometheus to detect and prevent security breaches on EHR's web-based applications.",
      "Use GKE private clusters for all Kubernetes workloads."
    ],
    "answer": [
      "Verify EHR's product usage against the list of compliant products on the Google Cloud compliance page.;Advise EHR to execute a Business Associate Agreement (BAA) with Google Cloud."
    ],
    "multiple": true
  },
  {
    "question": "For this question, refer to the EHR Healthcare case study. You need to define the technical architecture for securely deploying workloads to Google Cloud. You also need to ensure that only verified containers are deployed using Google Cloud services. What should you do? (Choose two.)",
    "options": [
      "Enable Binary Authorization on GKE, and sign containers as part of a CI/CD pipeline.",
      "Configure Jenkins to utilize Kritis to cryptographically sign a container as part of a CI/CD pipeline.",
      "Configure Container Registry to only allow trusted service accounts to create and deploy containers from the registry.",
      "Configure Container Registry to use vulnerability scanning to confirm that there are no vulnerabilities before deploying the workload."
    ],
    "answer": [
      "Enable Binary Authorization on GKE, and sign containers as part of a CI/CD pipeline.;Configure Container Registry to use vulnerability scanning to confirm that there are no vulnerabilities before deploying the workload."
    ],
    "multiple": true
  },
  {
    "question": "You need to upgrade the EHR connection to comply with their requirements. The new connection design must support business-critical needs and meet the same network and security policy requirements. What should you do?",
    "options": [
      "Add a new Dedicated Interconnect connection.",
      "Upgrade the bandwidth on the Dedicated Interconnect connection to 100 G.",
      "Add three new Cloud VPN connections.",
      "Add a new Carrier Peering connection."
    ],
    "answer": [
      "Add a new Dedicated Interconnect connection."
    ],
    "multiple": false
  },
  {
    "question": "For this question, refer to the EHR Healthcare case study. You need to define the technical architecture for hybrid connectivity between EHR's on-premises systems and Google Cloud. You want to follow Google's recommended practices for production-level applications. Considering the EHR Healthcare business and technical requirements, what should you do?",
    "options": [
      "Configure two Partner Interconnect connections in one metro (City), and make sure the Interconnect connections are placed in different metro zones.",
      "Configure two VPN connections from on-premises to Google Cloud, and make sure the VPN devices on-premises are in separate racks.",
      "Configure Direct Peering between EHR Healthcare and Google Cloud, and make sure you are peering at least two Google locations.",
      "Configure two Dedicated Interconnect connections in one metro (City) and two connections in another metro, and make sure the Interconnect connections are placed in different metro zones."
    ],
    "answer": [
      "Configure two Dedicated Interconnect connections in one metro (City) and two connections in another metro, and make sure the Interconnect connections are placed in different metro zones."
    ],
    "multiple": false
  },
  {
    "question": "For this question, refer to the EHR Healthcare case study. You are a developer on the EHR customer portal team. Your team recently migrated the customer portal application to Google Cloud. The load has increased on the application servers, and now the application is logging many timeout errors. You recently incorporated Pub/Sub into the application architecture, and the application is not logging any Pub/Sub publishing errors. You want to improve publishing latency. What should you do?",
    "options": [
      "Increase the Pub/Sub Total Timeout retry value.",
      "Move from a Pub/Sub subscriber pull model to a push model.",
      "Turn off Pub/Sub message batching.",
      "Create a backup Pub/Sub message queue."
    ],
    "answer": [
      "Turn off Pub/Sub message batching."
    ],
    "multiple": false
  },
  {
    "question": "For this question, refer to the EHR Healthcare case study. In the past, configuration errors put public IP addresses on backend servers that should not have been accessible from the Internet. You need to ensure that no one can put external IP addresses on backend Compute Engine instances and that external IP addresses can only be configured on frontend Compute Engine instances. What should you do?",
    "options": [
      "Create an Organizational Policy with a constraint to allow external IP addresses only on the frontend Compute Engine instances.",
      "Revoke the compute.networkAdmin role from all users in the project with front end instances.",
      "Create an Identity and Access Management (IAM) policy that maps the IT staff to the compute.networkAdmin role for the organization.",
      "Create a custom Identity and Access Management (IAM) role named GCE_FRONTEND with the compute.addresses.create permission."
    ],
    "answer": [
      "Create an Organizational Policy with a constraint to allow external IP addresses only on the frontend Compute Engine instances."
    ],
    "multiple": false
  },
  {
    "question": "For this question, refer to the EHR Healthcare case study. You are responsible for designing the Google Cloud network architecture for Google Kubernetes\nEngine. You want to follow Google best practices. Considering the EHR Healthcare business and technical requirements, what should you do to reduce the attack surface?",
    "options": [
      "Use a private cluster with a private endpoint with master authorized networks configured.",
      "Use a public cluster with firewall rules and Virtual Private Cloud (VPC) routes.",
      "Use a private cluster with a public endpoint with master authorized networks configured.",
      "Use a public cluster with master authorized networks enabled and firewall rules."
    ],
    "answer": [
      "Use a private cluster with a private endpoint with master authorized networks configured."
    ],
    "multiple": false
  },
];

questions.sort(() => Math.random() - 0.5);


let currentQuestion = 0;
let score = 0;
let showingFeedback = false;
let quizStartTime = new Date();

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const finishBtn = document.getElementById('finishTestBtn');



function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function updateProgress() {
  const progressPercent = ((currentQuestion) / questions.length) * 100;
  document.getElementById('progressBar').style.width = `${progressPercent}%`;
  document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  const shuffledOptions = shuffleArray([...q.options]);
  
  const inputType = q.multiple ? "checkbox" : "radio";

    shuffledOptions.forEach(option => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label class="option">
          <input type="${inputType}" name="option" value="${option}">
          <span>${option}</span>
        </label>`;
      optionsEl.appendChild(li);
    });

  // ✅ Now add the `.selected` logic AFTER options are rendered
  optionsEl.querySelectorAll("input[type='radio']").forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      input.parentElement.classList.add('selected');
    });
  });

  resultEl.innerHTML = "";
  nextBtn.textContent = "Submit";
  showingFeedback = false;
  updateProgress();

  if (currentQuestion === questions.length - 1) {
    finishBtn.style.display = "block";
  } else {
    finishBtn.style.display = "none";
  }

    if (currentQuestion >= 1) {
      finishBtn.style.display = "block";
    } else {
      finishBtn.style.display = "none";
    }
}


let totalTimeInSeconds = 90 * 60; // 1 hour 30 minutes = 5400 seconds
const timerEl = document.getElementById("timer");

function updateTimerDisplay() {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const seconds = totalTimeInSeconds % 60;

  let timeParts = [];

  if (hours > 0) timeParts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0 || hours > 0) timeParts.push(`${minutes} min${minutes !== 1 ? 's' : ''}`);
  timeParts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

  timerEl.textContent = `Time Remaining: ${timeParts.join(', ')}`;
}


function startTimer() {
  countdownInterval = setInterval(() => {
    totalTimeInSeconds--;
    updateTimerDisplay();

    if (totalTimeInSeconds <= 0) {
      clearInterval(countdownInterval);
      alert("Time's up! Submitting your quiz.");
      showResult();
    }
  }, 1000);
}



let countdownInterval = setInterval(() => {
  totalTimeInSeconds--;
  updateTimerDisplay();

  if (totalTimeInSeconds <= 0) {
    clearInterval(countdownInterval);
    alert("Time's up! Submitting your quiz.");
    showResult();
  }
}, 1000);

updateTimerDisplay(); // show initial value



nextBtn.addEventListener("click", () => {
  const currentQ = questions[currentQuestion];
  const selectedInputs = Array.from(document.querySelectorAll("input[name='option']:checked"));
  const correctAnswers = currentQ.answer;

  if (!showingFeedback) {
    if (selectedInputs.length === 0) return alert("Please select at least one option.");

    const selectedValues = selectedInputs.map(input => input.value);
    const isCorrect = correctAnswers.length === selectedValues.length &&
                      correctAnswers.every(ans => selectedValues.includes(ans));

    // Disable all inputs
    document.querySelectorAll("input[name='option']").forEach(input => input.disabled = true);

    // Highlight correct and incorrect
    document.querySelectorAll("input[name='option']").forEach(input => {
      const parentLabel = input.parentElement;
      if (correctAnswers.includes(input.value)) {
        parentLabel.classList.add("correct");
      }
      if (input.checked && !correctAnswers.includes(input.value)) {
        parentLabel.classList.add("incorrect");
      }
    });

    // Feedback
    if (isCorrect) {
      score++;
      resultEl.innerHTML = `<p style="color: green;">✅ Correct!</p>`;
    } else {
      resultEl.innerHTML = `<p style="color: red;">❌ Incorrect.</p>
                            <p>Correct Answer: <strong>${correctAnswers.join(", ")}</strong></p>`;
    }

    nextBtn.textContent = currentQuestion < questions.length - 1 ? "Next Question" : "See Result";
    showingFeedback = true;

  } else {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
});

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join(' ');
}


// Save score to history in localStorage
function saveScoreToHistory(score, total) {
  const endTime = new Date();
  const durationInSeconds = Math.floor((endTime - quizStartTime) / 1000);
  const duration = formatDuration(durationInSeconds);

  const scoreRecord = {
    score,
    total,
    date: endTime.toLocaleString(),
    duration
  };

  let history = JSON.parse(localStorage.getItem('quizScoreHistory')) || [];
  history.push(scoreRecord);
  localStorage.setItem('quizScoreHistory', JSON.stringify(history));
}

// Show full history above quiz
function displayScoreHistory() {
  const container = document.querySelector(".container");
  let history = JSON.parse(localStorage.getItem('quizScoreHistory')) || [];

  // Remove existing history display if any
  const existingHistory = document.getElementById('scoreHistory');
  if (existingHistory) existingHistory.remove();

  if (history.length === 0) return;

  // Create history table
  const historyDiv = document.createElement('div');
  historyDiv.id = 'scoreHistory';
  historyDiv.innerHTML = `
    <h3>Score History</h3>
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>#</th>
          <th>Score</th>
          <th>Time Taken</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${history.map((item, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${item.score} / ${item.total}</td>
            <td>${item.duration || '-'}</td>
            <td>${item.date}</td>
          </tr>`).join('')}
      </tbody>
    </table>
    <button id="clearHistoryBtn" style="margin-top: 10px;">Clear History</button>
    <hr>
  `;

  container.insertBefore(historyDiv, document.getElementById("quiz"));

  // Add clear history button event listener
  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear your score history?")) {
      localStorage.removeItem('quizScoreHistory');
      displayScoreHistory(); // Remove history display
    }
  });
}

// Updated showResult to save score and show history
function showResult() {
  saveScoreToHistory(score, questions.length);
  document.getElementById("quiz").style.display = "none";
  document.getElementById("finalResult").style.display = "block";
  document.getElementById("finalResult").innerHTML = `
      <h2>Your Score: ${score}/${questions.length}</h2>
      <button id="restartQuizBtn" style="margin-top: 16px;">Restart Quiz</button>
`;
  finishBtn.style.display = "none";

  displayScoreHistory();

  // ✅ Restart logic with timer reset
  document.getElementById("restartQuizBtn").addEventListener("click", () => {
    // Reset quiz state
    score = 0;
    currentQuestion = 0;
    showingFeedback = false;
    quizStartTime = new Date();

    // Reset timer
    clearInterval(countdownInterval);
    totalTimeInSeconds = 90 * 60; // 1 hour 30 minutes
    updateTimerDisplay();
    startTimer(); // start a new countdown

    // Re-shuffle and reload quiz
    questions.sort(() => Math.random() - 0.5);
    document.getElementById("quiz").style.display = "block";
    document.getElementById("finalResult").style.display = "none";
    loadQuestion();
  });
}

// Initial call to show history on page load
// displayScoreHistory(); 

finishBtn.style.display = "none"; // start hidden

startTimer();

// Initial call to load first question
loadQuestion();
