//Datos inicializados
let confidentiality_data = [
    { code: 'c1', question: 'La Empresa podría ser hecha legalmente responsable por un socio de negocios, cliente o empleado? (Responsabilidad Legal)', is_critical: true, multilicador: 4 },
    { code: 'c2', question: 'Las relaciones con socios de negocios, proveedores, etc. podrían ser impactadas de manera negativa? (Reputación Comercial)', is_critical: false, multilicador: 1 },
    { code: 'c3', question: 'Sería dañada la reputación la Empresa ante los clientes? (Confianza del Público)', is_critical: false, multilicador: 2 },
    { code: 'c4', question: 'Podría ser afectada la moral, motivación de los empleados y/o verse afectadas las relaciones entre asociados diversos? (Moral del personal)', is_critical: false, multilicador: 1 },
    { code: 'c5', question: 'Podría perderse alguna ventaja competitiva y/o información propietaria sobre los procesos del negocio? (Desventaja Competitiva)', is_critical: false, multilicador: 1 },
    { code: 'c6', question: 'Se podría producir un efecto directo de disminución de ingresos y/o aumento de costos? (Costo Adicional)', is_critical: false, multilicador: 2 },
    { code: 'c7', question: 'Se podría ver afectada la Confidencialidad de otros activos de información? (Efecto Colateral)', is_critical: false, multilicador: 1 },
    { code: 'c8', question: 'Se podría generar una estafa, operación fraudulenta u otro tipo de apropiación indebida? (Fraude)', is_critical: true, multilicador: 4 },
];

let integrity_data = [
    { code: 'i1', question: 'Podrían generarse inexactitudes en los estados financieros y otros reportes relacionados la Empresa? (Exactitud de Estados Financieros)' },
    { code: 'i2', question: 'Podrían romperse o violarse obligaciones legales, regulatorias o contractuales? (Responsabilidad Legal)' },
    { code: 'i3', question: 'Podrían perderse relaciones comerciales, negocios, contratos de servicio, etc. como resultado de la modificación de información? (Pérdida Directa de Negocios)' },
    { code: 'i4', question: 'Podrían tomarse decisiones de negocios erradas? (Toma de Decisiones)' },
    { code: 'i5', question: 'Podrían verse interrumpidas y/o demoradas las operaciones? (Costos Adicionales)' },
    { code: 'i6', question: 'Podría publicarse información errada (tasas, políticas, etc.)? (Costos Adicionales)' },
    { code: 'i7', question: 'Podría dañarse la imagen la Empresa? (Confianza del Público)' },
    { code: 'i8', question: 'Sería dificultoso el proceso de corrección / restauración de la información?' },
    { code: 'i9', question: 'Sería poco probable el detectar la inexactitud o error antes de que se hubiera producido un daño significativo?' },
    { code: 'i10', question: 'Se podría generar una estafa, operación fraudulenta o algún otro tipo de apropiación indebida? (Fraude)' }
];

let availability_data = [
    { code: 'd1', question: 'La Empresa podría ser hecha legalmente responsable por un socio de negocios,cliente o empleado? (Responsabilidad Legal)' },
    { code: 'd2', question: 'Podría dañarse la imagen la Empresa? (Confianza del Público)' },
    { code: 'd3', question: 'Podrían tomarse decisiones de negocios erradas o inoportunas, ocasionaría ? demoras en la toma de Decisiones? (Toma de Decisiones)' },
    { code: 'd4', question: 'Podrían perderse relaciones comerciales, negocios, contratos de servicio, etc. Como resultado de la no disponibilidad de la información? (Pérdida Directa de Negocios) ' },
    { code: 'd5', question: 'Podría afectarse la capacidad de proveer productos y servicios a lo largo del tiempo, de tal manera que se pudiera ver reducida la base de clientes? (Costo Directo)' },
    { code: 'd6', question: 'Se podría generar una estafa, operación fraudulenta o algún otro tipo de apropiación indebida, por ejemplo, por pérdida de controles? (Fraude)' },
    { code: 'd7', question: 'Se podría afectar una función de negocios crítica (que no puede ser demorada)?' },
    { code: 'd8', question: 'Se podría afectar el correcto funcionamiento de otros sistemas, procesos y/o la provisión de otros productos y servicios? (Efecto Colateral)' },
];

let privacy_data = [
    { code: 'p1', question: '¿El recurso maneja o contiene datos demográficos? (Nombre, dirección, teléfono, etc.)' },
];

let options_main = [
    { value: 3, text: 'ALTO' },
    { value: 2, text: 'MEDIO' },
    { value: 1, text: 'BAJO' },
    { value: 0, text: 'CASI NULO' }
];

let options_secondary = [
    { value: 3, text: 'ALTO' },
    { value: 2, text: 'MEDIO' },
    { value: 1, text: 'BAJO' },
];

//Funcion para generar las preguntas
function generateQuestion(data, section, options) {
    var html = `<div class="header_form"><b></p>Código</b></div>
    <div class="header_form"><b></p>Escenario</b></div>
    <div class="header_form"><b></p>Puntuación</b></div>`;
    options_text = '';
    options.forEach(function (item) {
        options_text += `<option value="${item.value}">${item.text}</option>`;
    });
    data.forEach(function (item) {
        html += `<div class="content_form"><p class="code">${item.code}</p></div>
        <div class="content_form"><p>${item.question}</p></div>
        <div class="content_Form">
        <select name="${item.code}_puntuacion" id="${item.code}_puntuacion">
        <option value="" disabled selected>Selecciona una opción</option>
        ${options_text}
        </select>
    </div>`;
    });
    document.querySelector(`.${section}`).innerHTML = html;
}

function getScores(data) {
    let answers = {};
    let status = true;
    data.forEach(function (item) {
        let answer = document.getElementById(`${item.code}_puntuacion`).value;
        if (answer) {
            answers[item.code] = parseInt(answer);
        } else {
            status = false;
        }
    });
    if (!status) {
        return false;
    }
    return answers;
}

function calculateConfidentialityScore(answers) {
    score = 0;
    if (answers.c1 == 3 || answers.c8 == 3) {
        return 3;
    }
    score = (answers.c1 * 4 + answers.c2 + answers.c3 * 2 + answers.c4 + answers.c5 + answers.c6 * 2 + answers.c7 + answers.c8 * 3) / 15;
    return score;
}

function calculateIntegrityScore(answers) {
    score = 0;
    if (answers.i2 == 3 || answers.i10 == 3) {
        return 3;
    }
    score = (answers.i1 * 4 + answers.i2 * 4 + answers.i3 * 3 + answers.i4 + answers.i5 + answers.i6 * 3 + answers.i7 * 3 + answers.i8 + answers.i9 * 2 + answers.i10 * 3) / 25;
    return score;
}

function calculateAvailabilityScore(answers) {
    score = 0;
    if (answers.d1 == 3 || answers.d7 == 3) {
        return 3;
    }
    score = (answers.d1 * 4 + answers.d2 * 3 + answers.d3 + answers.d4 * 2 + answers.d5 * 2 + answers.d6 * 3 + answers.d7 * 4 + answers.d8) / 20;
    return score;
}

//Generar preguntas
generateQuestion(confidentiality_data, 'confidentiality_questions', options_main);
generateQuestion(availability_data, 'availability_questions', options_main);
generateQuestion(integrity_data, 'integrity_questions', options_main);
generateQuestion(privacy_data, 'privacy_questions', options_secondary);

//boton de informacion
document.getElementById('infoBtn').addEventListener('click', function () {
    var icono = this.querySelector('#infoBtn_icon');
    var content = document.querySelector('#information_content');
    if (!content.classList.contains('show')) {
        icono.classList.remove('fa-angle-down');
        icono.classList.add('fa-angle-up');
        content.classList.add('show');
    } else {
        icono.classList.remove('fa-angle-up');
        icono.classList.add('fa-angle-down');
        content.classList.remove('show')
    }
});


//Funcion para la clasificacion de activos de información
document.getElementById('classificationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var system = document.getElementById('system').value;
    var owner = document.getElementById('owner').value;
    var authorizer = document.getElementById('authorizer').value;

    let confidentiality_scores = getScores(confidentiality_data);
    let availability_scores = getScores(availability_data);
    let integrity_scores = getScores(integrity_data);
    let privacy_scores = getScores(privacy_data);

    if (!confidentiality_scores || !availability_scores || !integrity_scores || !privacy_scores) {
        alert('Debes responder todas las preguntas');
        return false;
    }

    let confidentiality_score = calculateConfidentialityScore(confidentiality_scores);
    let availability_score = calculateAvailabilityScore(availability_scores);
    let integrity_score = calculateIntegrityScore(integrity_scores);
    let privacy_score = privacy_scores.p1;

    let clasification = '';

    if (confidentiality_score >= 2.5 || integrity_score >= 2.5 || availability_score >= 2.75 && privacy_score >= 2) {
        clasification = 'CRITICO O CONFIDENCIAL';
    }
    else if (confidentiality_score < 1.25 && integrity_score < 1.25 && availability_score < 1.5 && privacy_score < 1) {
        clasification = 'NO SENSITIVO O PUBLICO';
    } else {
        clasification = "SENSITIVO O PRIVADO";
    }

    document.getElementById('confidentiality_score').innerText = confidentiality_score;
    document.getElementById('availability_score').innerText = availability_score;
    document.getElementById('integrity_score').innerText = integrity_score;
    document.getElementById('privacy_score').innerText = privacy_score;
    document.getElementById('final_classification').innerText = clasification;

    console.log(confidentiality_scores);
    console.log(availability_scores);
    console.log(integrity_scores);
    console.log(privacy_scores);

});

document.getElementById('savePdfBtn').addEventListener('click', function () {
    // Crea un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Carga dinámicamente el script jspdf-autotable
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.16/jspdf.plugin.autotable.min.js';
    script.onload = function () {
        // Espera a que la biblioteca se cargue completamente
        setTimeout(function () {
            // Opciones de estilo para las tablas
            const tableOptions = {
                theme: 'grid',
                headerStyles: {
                    fillColor: '#ADFF2F', // Cambia el color de fondo de las celdas del encabezado
                    textColor: '#000000',
                    fontSize: 12,
                    fontStyle: 'bold',
                },
                bodyStyles: {
                    fontSize: 10,
                    fillColor: '#f3f4f9', 
                },
                alternateRowStyles: {
                    fillColor: '#f3f4f9', 
                },
            };

            // Agrega el título del formulario al PDF
            doc.setFontSize(18);
            doc.text('Formulario de Clasificación de Activos de Información', 10, 10);

            // Valor de desplazamiento vertical inicial
            let y = 20;

            // Agrega el nombre del sistema al PDF, propietario y autorizador
            doc.setFontSize(12);

            // Sistema
            doc.text('Sistema:', 10, y);
            y += 10; 
            const systemTextLines = doc.splitTextToSize(document.getElementById('system').value, 180);
            for (let i = 0; i < systemTextLines.length; i++) {
                doc.text(systemTextLines[i], 25, y);
                y += 5; // Aumenta el desplazamiento vertical para la siguiente línea
            }

            // Propietario
            doc.text('Propietario:', 10, y);
            y += 10; 
            const ownerTextLines = doc.splitTextToSize(document.getElementById('owner').value, 180);
            for (let i = 0; i < ownerTextLines.length; i++) {
                doc.text(ownerTextLines[i], 25, y);
                y += 5; // Aumenta el desplazamiento vertical para la siguiente línea
            }

            // Autorizador
            doc.text('Autorizador:', 10, y);
            y += 10; 
            const authorizerTextLines = doc.splitTextToSize(document.getElementById('authorizer').value, 180);
            for (let i = 0; i < authorizerTextLines.length; i++) {
                doc.text(authorizerTextLines[i], 25, y);
                y += 5; // Aumenta el desplazamiento vertical para la siguiente línea
            }

            // Obtiene las respuestas y clasificación del formulario
            const confidentiality_scores = getScores(confidentiality_data);
            const availability_scores = getScores(availability_data);
            const integrity_scores = getScores(integrity_data);
            const privacy_scores = getScores(privacy_data);
            const classification = document.getElementById('final_classification').innerText;

            // Agrega las respuestas y clasificación al PDF
            doc.setFontSize(12);

            // Confidencialidad
            doc.text('Confidencialidad:', 10, y);
            y += 10; // Aumenta el desplazamiento vertical

            const confidentialityColumns = [
                { header: 'Pregunta', dataKey: 'question' },
                { header: 'Respuesta', dataKey: 'answer' },
            ];

            const confidentialityRows = confidentiality_data.map(function (item) {
                return {
                    question: item.question,
                    answer: options_main.find(option => option.value === confidentiality_scores[item.code]).text,
                };
            });

            doc.autoTable(confidentialityColumns, confidentialityRows, {
                ...tableOptions,
                startY: y,
            });

            y = doc.lastAutoTable.finalY + 10;

            // Disponibilidad
            doc.text('Disponibilidad:', 10, y);
            y += 10; // Aumenta el desplazamiento vertical

            const availabilityColumns = [
                { header: 'Pregunta', dataKey: 'question' },
                { header: 'Respuesta', dataKey: 'answer' },
            ];

            const availabilityRows = availability_data.map(function (item) {
                return {
                    question: item.question,
                    answer: options_main.find(option => option.value === availability_scores[item.code]).text,
                };
            });

            doc.autoTable(availabilityColumns, availabilityRows, {
                ...tableOptions,
                startY: y,
            });

            y = doc.lastAutoTable.finalY + 10;

            // Integridad
            doc.text('Integridad:', 10, y);
            y += 10; // Aumenta el desplazamiento vertical

            const integrityColumns = [
                { header: 'Pregunta', dataKey: 'question' },
                { header: 'Respuesta', dataKey: 'answer' },
            ];

            const integrityRows = integrity_data.map(function (item) {
                return {
                    question: item.question,
                    answer: options_main.find(option => option.value === integrity_scores[item.code]).text,
                };
            });

            doc.autoTable(integrityColumns, integrityRows, {
                ...tableOptions,
                startY: y,
            });

            y = doc.lastAutoTable.finalY + 10;

            // Privacidad
            doc.text('Privacidad:', 10, y);
            y += 10; // Aumenta el desplazamiento vertical

            const privacyColumns = [
                { header: 'Pregunta', dataKey: 'question' },
                { header: 'Respuesta', dataKey: 'answer' },
            ];

            const privacyRows = privacy_data.map(function (item) {
                return {
                    question: item.question,
                    answer: options_secondary.find(option => option.value === privacy_scores[item.code]).text,
                };
            });

            doc.autoTable(privacyColumns, privacyRows, {
                ...tableOptions,
                startY: y,
            });

            y = doc.lastAutoTable.finalY + 10;

            // Clasificación final
            doc.text('Clasificación Final:', 10, y);
            y += 10; // Aumenta el desplazamiento vertical
            doc.text(`Clasificación: ${classification}`, 15, y);

            // Guarda el PDF como archivo
            const fileName = window.prompt('Nombre del archivo PDF', 'reporte');
            if (fileName) {
                doc.save(fileName + '.pdf');
            }
        }, 100); // Ajusta este tiempo de espera según sea necesario
    };

    document.head.appendChild(script);
});



//SCRIPT DE LLENADO AUTOMATICO DEL FORMULARIO
//COPIAR EN LA CONSOLA DEL NAVEGADOR Y EJECUTAR
/*
// Obtén todos los elementos <select> del documento
var selectElements = document.getElementsByTagName('select');

// Itera sobre cada elemento <select>
for (var i = 0; i < selectElements.length; i++) {
    // Crea un array para almacenar las opciones que no están deshabilitadas
    var enabledOptions = [];

    // Itera sobre cada opción en el <select> actual
    for (var j = 0; j < selectElements[i].options.length; j++) {
        // Si la opción no está deshabilitada, añádela al array
        if (!selectElements[i].options[j].disabled) {
            enabledOptions.push(j);
        }
    }

    // Si hay opciones habilitadas, selecciona una al azar
    if (enabledOptions.length > 0) {
        var randomIndex = Math.floor(Math.random() * enabledOptions.length);
        selectElements[i].selectedIndex = enabledOptions[randomIndex];
    }
}
*/

//SCRIPT DE SELECCION DE UN VALOR ESPECIFICO
//COPIAR EN LA CONSOLA DEL NAVEGADOR Y EJECUTAR
/*
// Itera sobre cada elemento <select>
for (var i = 0; i < selectElements.length; i++) {
    for (var j = 0; j < selectElements[i].options.length; j++) {
        //SELECCIONA EL VALOR "ALTO" PARA TODOS LOS SELECT  
        if (selectElements[i].options[j].value === "3") {
            selectElements[i].selectedIndex = j;
            break;
        }
    }
}
*/
