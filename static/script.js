document.getElementById("year").innerHTML = new Date().getFullYear();

async function getTask() {
	const response = await fetch('/get_task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const result = await response.json();
	const taskResult = document.getElementById('taskResult');
	if (response.ok) {
		const exerciseName = result.exercise.name;
		const chore = result.chore;
		taskResult.innerHTML = `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 text-center text-md-start">
                <h4 class="alert-heading">Exercise:</h4>
                <p>
                    <button class="btn btn-outline-warning" onclick="chooseTask('exercise', '${exerciseName}')">
                        ${exerciseName}</button>
                </p>
            </div>
            <div class="col-md-6 text-center text-md-start">
                <h4 class="alert-heading">or do a chore:</h4>
                <p>
                    <button class="btn btn-outline-warning" onclick="chooseTask('chore', '${chore}')">
                        ${chore}
                    </button>
                </p>
            </div>
        </div>
    </div>
	`;

	} else {
		taskResult.innerHTML = `<div class="alert alert-danger">${result.error}</div>`;
	}
}

let countdownInterval; // Variable to store the countdown interval

function chooseTask(taskType, taskName) {
	const taskResult = document.getElementById('taskResult');
	taskResult.innerHTML = `
        <div>
            <h4 class="text-center text-md-start">${taskName}</h4>
            <div id="countdownTimer" class="text-center text-md-start mt-3"></div>
        </div>
    `;

	// Dynamically update the exercise or chore image based on taskType
	const goyaPainting = document.getElementById('goyaPainting');
	goyaPainting.src = taskType === 'exercise' ? 'static/assets/Goya-Exercise.png' : 'static/assets/Goya-Chore.png';

	// Clear previous countdown interval if exists
	clearInterval(countdownInterval);

	// Start new countdown timer
	startCountdownTimer(5 * 60); // 5 minutes in seconds
}

function startCountdownTimer(duration) {
	const countdownTimer = document.getElementById('countdownTimer');

	let timer = duration;

	countdownInterval = setInterval(function () {
			const minutes = parseInt(timer / 60, 10);
			const seconds = parseInt(timer % 60, 10);

			const minutesDisplay = minutes < 10 ? "0" + minutes : minutes;
			const secondsDisplay = seconds < 10 ? "0" + seconds : seconds;

			countdownTimer.innerHTML = `
					<h4 class="text-warning">Time left:</h4>
					<div class="display-4 text-warning">${minutesDisplay}:${secondsDisplay}</div>
			`;

			if (--timer < 0) {
					clearInterval(countdownInterval);
					countdownTimer.innerHTML = `
							<h4 class="text-warning">Time left:</h4>
							<div class="display-4 text-warning">Time's up!</div>
					`;
			}
	}, 1000);
}
