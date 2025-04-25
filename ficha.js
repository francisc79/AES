document.addEventListener('DOMContentLoaded', function() {
    const trainingSheet = document.getElementById('training-sheet');

    window.onload = function() {
        const savedWorkoutData = localStorage.getItem('workoutData');

        console.log("savedWorkoutData", savedWorkoutData);

        if (savedWorkoutData) {
            try {
                const workoutData = JSON.parse(savedWorkoutData);
                displayWorkoutData(workoutData);
            } catch (error) {
                console.error('Erro ao analisar os dados do Local Storage:', error);
                alert('Ocorreu um erro ao carregar a ficha de treino salva.');
            }
        } else {
            // Se não houver dados, você pode adicionar o botão aqui também,
            // caso sua estrutura HTML inicial esteja vazia.
            const saveButton = document.createElement('button');
            saveButton.id = 'save-workout';
            saveButton.classList.add('save-button');
            saveButton.textContent = 'Salvar Ficha';
            trainingSheet.appendChild(saveButton);
        }
    };

    function displayWorkoutData(data) {
        const trainingSheet = document.getElementById('training-sheet');
        trainingSheet.innerHTML = ''; // Limpa a ficha de treino existente

        data.forEach(sequenceData => {
            const sequenceDiv = document.createElement('div');
            sequenceDiv.classList.add('sequencia');
            sequenceDiv.dataset.sequencia = sequenceData.sequencia;

            sequenceDiv.innerHTML += `<h3 class="sequencia-header">Sequência ${sequenceData.sequencia}</h3>`;

            for (const grupoNome in sequenceData.gruposMusculares) {
                const grupoData = sequenceData.gruposMusculares[grupoNome];

                const grupoDiv = document.createElement('div');
                grupoDiv.classList.add('grupo');
                grupoDiv.innerHTML += `<h4 class="grupo-header">${grupoNome}</h4>`;

                const exerciciosGrupoDiv = document.createElement('div');
                exerciciosGrupoDiv.classList.add('exercicios-grupo');

                grupoData.forEach(exercicio => {
                    const exercicioRow = document.createElement('div');
                    exercicioRow.classList.add('exercicio-row');
                    exercicioRow.innerHTML = `
                        <input type="text" value="${exercicio.exercicio}" placeholder="Exercício">
                        <input type="number" value="${exercicio.series}" placeholder="Séries">
                        <input type="number" value="${exercicio.repeticoes}" placeholder="Repetições">
                        <input type="text" value="${exercicio.descanso}" placeholder="Descanso">
                        <button class="remove-button">Remover</button>
                    `;
                    exerciciosGrupoDiv.appendChild(exercicioRow);
                });

                grupoDiv.appendChild(exerciciosGrupoDiv);
                grupoDiv.innerHTML += `<button class="add-button" data-grupo="${grupoNome}">Adicionar Exercício</button>`;
                sequenceDiv.appendChild(grupoDiv);
            }

            trainingSheet.appendChild(sequenceDiv);
        });

        // Adiciona o botão "Salvar Ficha" AO FINAL da ficha carregada
        const saveButton = document.createElement('button');
        saveButton.id = 'save-workout';
        saveButton.classList.add('save-button');
        saveButton.textContent = 'Salvar Ficha';
        trainingSheet.appendChild(saveButton);
    }

    trainingSheet.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-button')) {
            const exercicioRow = event.target.parentNode;
            const exerciciosGrupo = exercicioRow.parentNode;
            exerciciosGrupo.removeChild(exercicioRow);
        }

        if (event.target.classList.contains('add-button')) {
            const grupo = event.target.dataset.grupo;
            const exerciciosGrupo = event.target.previousElementSibling;
            const newRow = document.createElement('div');
            newRow.classList.add('exercicio-row');
            newRow.innerHTML = `
                <input type="text" placeholder="Exercício">
                <input type="number" placeholder="Séries" value="3">
                <input type="number" placeholder="Repetições" value="10">
                <input type="text" placeholder="Descanso" value="60 seg">
                <button class="remove-button">Remover</button>
            `;
            exerciciosGrupo.appendChild(newRow);
        }

        if (event.target.id === 'save-workout') {
            console.log("Botão Salvar clicado!");
            const sequences = document.querySelectorAll('.sequencia');
            const workoutData = [];

            sequences.forEach(sequenciaElement => {
                const sequenciaNum = sequenciaElement.dataset.sequencia;
                const gruposElementos = sequenciaElement.querySelectorAll('.grupo');
                const gruposMusculares = {};

                gruposElementos.forEach(grupoElement => {
                    const grupoNome = grupoElement.querySelector('.grupo-header').textContent.toLowerCase();
                    const exerciciosGrupo = grupoElement.querySelector('.exercicios-grupo');
                    const exercicios = [];
                    const exercicioRows = exerciciosGrupo.querySelectorAll('.exercicio-row');

                    exercicioRows.forEach(row => {
                        const inputs = row.querySelectorAll('input[type="text"], input[type="number"]');
                        if (inputs.length === 4) {
                            exercicios.push({
                                exercicio: inputs[0].value,
                                series: parseInt(inputs[1].value),
                                repeticoes: parseInt(inputs[2].value),
                                descanso: inputs[3].value
                            });
                        }
                    });
                    gruposMusculares[grupoNome] = exercicios;
                });

                workoutData.push({
                    sequencia: sequenciaNum,
                    gruposMusculares: gruposMusculares
                });
            });

            console.log("Dados a serem salvos:", workoutData);
            localStorage.setItem('workoutData', JSON.stringify(workoutData));
            alert('Ficha de treino salva no Local Storage!');
        }
    });
});