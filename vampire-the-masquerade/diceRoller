const getResultType = (success, failure) => {
	let resultType;
	
	if (success - failure <= 0) {
		if (success == 0 && failure >= 1)
			resultType = 'Falha Crítica';
		else
			resultType = 'Falha Simples';
	} else {
		switch (success - failure) {
			case 1:
				resultType = 'Mínimo';
				break;
			case 2:
				resultType = 'Moderado';
				break;
			case 3:
				resultType = 'Total';
				break;
			case 4:
				resultType = 'Excepcional';
				break;
			default:
				resultType = 'Fenomenal';
		}
	}
	
	return resultType;
}

const getFailures = results => {
	let failure = 0;
	results.forEach(dice => {
		if (dice.result == 1)
			failure++;
	})
	
	return failure;
}

const diceRoll = container => {
	const ammount = Number(container[0].querySelector('#dice-ammount').value)
	const difficulty = Number(container[0].querySelector('#dice-difficulty').value)
	const additional = Number(container[0].querySelector('#dice-additional').value)
	   
	const roll = new Roll(`${ammount + additional}d10cs>=${difficulty}`);
	roll.roll();

	const success = Number(roll.result);
	const failure = getFailures(roll.terms[0].results);
	const resultType = getResultType(success, failure);

	roll.toMessage({
		flavor: `
			<h2><strong>Resultado: ${success - failure} (${resultType})</strong></h2>
			<strong>Sucessos:</strong> ${success} </br>
			<strong>Falhas:</strong> ${failure}
		`,
	});
}

const options = {
	title: "Rolador de Dados",
	content: `
		<label for='dice-ammount'>Quantidade</label> <input type='number' id='dice-ammount' min='1' max='10' value='1'></input>
		<hr>
		<label for='dice-difficulty'>Dificuldade</label> <input type='number' id='dice-difficulty' min='3' max='10' value='6'></input>
		<hr>
		<label for='dice-additional'>Modificador</label> <input type='number' id='dice-additional' value='0'></input>
		<hr>
	`,
	label: "Rolar",
	callback: diceRoll
}

Dialog.prompt(options);
