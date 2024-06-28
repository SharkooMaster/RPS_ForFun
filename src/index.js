function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function switch_active_choice(target)
{
	switch (target)
	{
		case 0:
			document.getElementById('choice_rock').style.color 		= "#FF0000";
			document.getElementById('choice_paper').style.color 	= "#D4D4D4";
			document.getElementById('choice_scissors').style.color 	= "#D4D4D4";
			break;
		case 1:
			document.getElementById('choice_rock').style.color 		= "#D4D4D4";
			document.getElementById('choice_paper').style.color 	= "#FF0000";
			document.getElementById('choice_scissors').style.color 	= "#D4D4D4";
			break;
		case 2:
			document.getElementById('choice_rock').style.color 		= "#D4D4D4";
			document.getElementById('choice_paper').style.color 	= "#D4D4D4";
			document.getElementById('choice_scissors').style.color 	= "#FF0000";
			break;
	}
}

async function fake_choosing()
{
	let loop_till_result = 20; // iterations until result shown.
	current = getRandomInt(0, 3)
	delta = 1

	for(let i = 0; i < loop_till_result; i++)
	{
		if(current == 2) { delta = -1; } else if(current == 0) { delta = 1; }
		current += delta;

		await switch_active_choice(current)

		await sleep(Math.max(100,i*20))
	}
}

let score = 0;
let running = false;

async function choose(user_choice)
{
	if(!running)
	{
		running = true;
		await fake_choosing();
		let cpu_choice = getRandomInt(0,2);
		console.log(cpu_choice);
		switch_active_choice(cpu_choice);

		const result_text = document.getElementById("result_text");

		if(cpu_choice === user_choice)
		{
			result_text.innerHTML = "Tie";
		}
		else if( (cpu_choice === 0 && user_choice === 2) || (cpu_choice === 2 && user_choice === 1) || (cpu_choice === 1 && user_choice === 0))
		{
			result_text.innerHTML = "You Lost";
			score -= 1;
		}
		else
		{
			result_text.innerHTML = "You Won";
			score += 1;
		}
		document.getElementById("score_text").innerHTML = `Score: ${score}`;
		running = false;
	}
}
