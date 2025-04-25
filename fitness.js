//tag CALCULADORA DE IMC

function calcularIMC() {
	var peso = parseFloat(document.getElementById("peso").value);
	var alturaCm = parseFloat(document.getElementById("altura").value);
	var resultadoDiv = document.getElementById("resultadoIMC");

	if (!peso || !alturaCm || alturaCm <= 0) {
		resultadoDiv.innerText = "Insira valores válidos.";
		resultadoDiv.className = ""; // Remove qualquer classe anterior
		return;
	}

	var altura = alturaCm / 100; // Converte centímetros para metros
	var imc = peso / (altura * altura);
	var classificacao =
		imc < 18.5
			? "Abaixo do peso"
			: imc < 24.9
			? "Peso normal"
			: imc < 29.9
			? "Sobrepeso"
			: "Obesidade";

	resultadoDiv.innerHTML = `
<div class="imc">IMC: ${imc.toFixed(2)}</div>
<div class="classificacao">${classificacao} ${getInfoIcon(classificacao)}</div>
`;

	// Remove classes anteriores e adiciona a nova classe correspondente
	resultadoDiv.className = "";
	if (classificacao === "Abaixo do peso")
		resultadoDiv.classList.add("abaixo-do-peso");
	else if (classificacao === "Peso normal")
		resultadoDiv.classList.add("peso-normal");
	else if (classificacao === "Sobrepeso")
		resultadoDiv.classList.add("sobrepeso");
	else if (classificacao === "Obesidade")
		resultadoDiv.classList.add("obesidade");
}

function getInfoIcon(classificacao) {
	const infoTexts = {
		"Abaixo do peso":
			"Estar abaixo do peso pode levar a deficiências nutricionais e problemas de saúde.",
		"Peso normal":
			"Estar com o peso normal reduz o risco de várias doenças e promove o bem-estar geral.",
		Sobrepeso:
			"Estar com sobrepeso pode aumentar o risco de doenças cardíacas, diabetes e outras condições.",
		Obesidade:
			"A obesidade está associada a um maior risco de doenças graves, incluindo diabetes tipo 2 e doenças cardíacas.",
	};
	return `
    <div class="info-container">
        <div class="info-icon" onclick="toggleInfoText(event)">?</div>
        <div class="info-text">${infoTexts[classificacao]}</div>
    </div>
`;
}

function toggleInfoText(event) {
	const infoText = event.target.nextElementSibling;
	infoText.style.display =
		infoText.style.display === "block" ? "none" : "block";
}

//tag CONTADOR DE ÁGUA
let totalAgua = 0;

function atualizarProgresso() {
	let meta = parseInt(document.getElementById("meta-agua").value);
	let progresso = (totalAgua / meta) * 100;
	document.getElementById("progress-bar").style.width = `${Math.min(
		progresso,
		100
	)}%`;
	document.getElementById("agua-total").innerText = totalAgua;
	document.getElementById(
		"progress-text"
	).innerText = `Consumido: ${totalAgua}ml`;
}

function adicionarAgua(qtd) {
	totalAgua += qtd;
	document.getElementById("agua-total").innerText = totalAgua;
	atualizarProgresso();
}

function adicionarAguaCustom() {
	let qtd = parseInt(document.getElementById("agua-custom").value);
	if (qtd > 0) adicionarAgua(qtd);
}

function resetarAgua() {
	totalAgua = 0;
	document.getElementById("agua-total").innerText = 0;
	atualizarProgresso();
}

//tag CALORIAS
function calcularGastoCalorico() {
	const idade = parseInt(
		document.getElementById("idade-calorias").value.trim()
	);
	const peso = parseFloat(
		document.getElementById("peso-calorias").value.trim()
	);
	const altura = parseFloat(
		document.getElementById("altura-calorias").value.trim()
	);
	const sexo = document.getElementById("sexo-calorias").value;
	const atividade = parseFloat(
		document.getElementById("atividade-calorias").value
	);

	// Verificar se os valores são válidos
	if (isNaN(idade) || idade <= 0) {
		document.getElementById("resultado-calorias").innerText =
			"Por favor, insira uma idade válida.";
		return;
	}
	if (isNaN(peso) || peso <= 0) {
		document.getElementById("resultado-calorias").innerText =
			"Por favor, insira um peso válido.";
		return;
	}
	if (isNaN(altura) || altura <= 0) {
		document.getElementById("resultado-calorias").innerText =
			"Por favor, insira uma altura válida.";
		return;
	}
	if (isNaN(atividade) || atividade <= 0) {
		document.getElementById("resultado-calorias").innerText =
			"Por favor, selecione um nível de atividade válido.";
		return;
	}

	// Calcular a Taxa Metabólica Basal (TMB)
	let taxaMetabolicaBasal;
	if (sexo === "masculino") {
		taxaMetabolicaBasal = 10 * peso + 6.25 * altura - 5 * idade + 5;
	} else {
		taxaMetabolicaBasal = 10 * peso + 6.25 * altura - 5 * idade - 161;
	}

	// Calcular o gasto calórico total
	const gastoCaloricoTotal = taxaMetabolicaBasal * atividade;

	// Exibir o resultado
	document.getElementById(
		"resultado-calorias"
	).innerHTML = `Seu gasto calórico diário é aproximadamente <strong>${gastoCaloricoTotal.toFixed(
		2
	)}</strong> calorias.`;
}

//tag QUIZ
function calculateResult(feeling) {
	let resultMessage = "";

	if (feeling === "triste") {
		resultMessage =
			"Você parece sentir um pouco de saudade. Que tal ouvir uma música que te reconforte ou escrever sobre suas memórias?";
	} else if (feeling === "animado") {
		resultMessage =
			"Você está em alta energia! Aproveite para fazer algo que você ama.";
	} else if (feeling === "cansado") {
		resultMessage =
			"Você pode estar precisando de um descanso. Tire um tempo para relaxar!";
	} else {
		resultMessage = "Que tal tirar um tempo para cuidar do seu bem-estar?";
	}

	document.getElementById("result").innerText = resultMessage;
}

//tag LEMBRE-SE DE BEBER ÁGUA
function agendarNotificacao() {
	let horas = parseInt(document.getElementById("horas").value) || 0;
	let minutos = parseInt(document.getElementById("minutos").value) || 0;
	let segundos = parseInt(document.getElementById("segundos").value) || 0;

	let tempoTotal = horas * 3600 + minutos * 60 + segundos;

	if (tempoTotal <= 0) {
		alert("Por favor, insira um tempo válido.");
		return;
	}

	if (!("Notification" in window)) {
		alert("Seu navegador não suporta notificações.");
		return;
	}

	Notification.requestPermission().then((permission) => {
		if (permission === "granted") {
			setTimeout(() => {
				let notification = new Notification("Beba água!", {
					body: "Para manter sua meta diária de água.",
					icon: "icon-180.png",
				});

				notification.onclick = () => {
					window.open("https://tomdrd.github.io/home/", "_blank");
				};
			}, tempoTotal * 1000);
		} else {
			alert("Você precisa permitir notificações para usar este recurso.");
		}
	});
}

//tag COMPARTILHE
function shareWhatsApp() {
	const url = encodeURIComponent(window.location.href);
	const text = encodeURIComponent("Confira este site incrível!");
	window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, "_blank");
}

function shareFacebook() {
	const url = encodeURIComponent(window.location.href);
	window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function shareEmail() {
	const subject = encodeURIComponent("Confira este site incrível!");
	const body = encodeURIComponent(
		`Dê uma olhada neste site: ${window.location.href}`
	);
	window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
}

function shareTwitter() {
	const url = encodeURIComponent(window.location.href);
	const text = encodeURIComponent("Confira este site incrível!");
	window.open(
		`https://twitter.com/intent/tweet?text=${text}&url=${url}`,
		"_blank"
	);
}



