let respuestas
const pregunta = document.querySelector('#cont_question')

const_questions = ['La seguridad de la información proporciona:',
                   'Las vulnerabilidades pueden ser por:']

const string_opc_1 = ['Confidencialidad', 'Acreditación','Integridad']
const string_opc_2 = ['Procesos', 'Personas', 'Sistema']

const string_res = [['Confidencialidad', 'Integridad'], ['Procesos', 'Sistema']]

const SRC_IMAGES = ['images/pista-0.png', 'images/pista-1.png']

let num_quest = 2
let intentos = 2

let contador = 0

let mi_opcion

function verificar_respuesta(lista_respuestas, opcion) {
    let tmp = false
    for (let i = 0; i < lista_respuestas.length; i++) {
        if(opcion === lista_respuestas[i]){
            tmp = true
        }
    }
    return tmp
}

function disable_draggable() {
    for (let i = 0; i < respuestas.length; i++) {
        const item = respuestas[i]
        item.setAttribute('draggable', 'false')
    }     
}

function able_draggable() {
    for (let i = 0; i < respuestas.length; i++) {
        const item = respuestas[i]
        item.setAttribute('draggable', 'true')
    }     
}

function add_eventos() {
    respuestas = document.querySelectorAll('#cont_answer')
    for (let i = 0; i < respuestas.length; i++) {
    
        const item = respuestas[i]
    
        item.addEventListener('dragstart', e => {
            mi_opcion = item
        })
    
        item.addEventListener('dragend', e => {
            mi_opcion = null
        })
        
    }

}


function view_answers(answers) {
    let item_tmp = document.querySelector('#col_answers').firstElementChild
    
    while(document.querySelectorAll('#cont_answer').length > 0){
        document.querySelector('#col_answers').removeChild(document.querySelector('#col_answers').firstElementChild)
    }

    for (let i = 0; i < answers.length; i++) {
        let child_tmp = item_tmp.cloneNode('true')
        child_tmp.innerText = answers[i]
        child_tmp.style.color = '#00339F'
        child_tmp.style.backgroundColor = '#E3E829'
        document.querySelector('#col_answers').appendChild(child_tmp)
    }
    document.querySelector('#col_answers').style.paddingTop = '15px'
    document.querySelector('#titulo_respuestas').style.display = 'block'
    intentos = 2
}

function next_question() {

    if(contador != 1){
        document.querySelector('#col_answers').style.paddingTop = '80px'
        document.querySelector('#titulo_respuestas').style.display = 'none'
        contador = contador + 1
        document.querySelector('#cont_question').innerText = const_questions[contador]
        document.getElementById('q_image').src = SRC_IMAGES[contador]

        let item_tmp = document.querySelector('#col_answers').firstElementChild
        
        while(document.querySelectorAll('#cont_answer').length > 0){
            document.querySelector('#col_answers').removeChild(document.querySelector('#col_answers').firstElementChild)
        }

        for (let i = 0; i < string_opc_2.length; i++) {
            let child_tmp = item_tmp.cloneNode('true')
            child_tmp.innerText = null
            let parg = document.createElement('p')
            let node_p = document.createTextNode(string_opc_2[i])
            parg.appendChild(node_p)
            child_tmp.appendChild(parg)
            child_tmp.style.color = 'white'
            child_tmp.style.backgroundColor = '#00ADC6'
            child_tmp.setAttribute('draggable', 'true')
            document.querySelector('#col_answers').appendChild(child_tmp)
        }
        add_eventos()
        document.getElementById('boton_continuar').style.display = 'none'
        respuestas = document.querySelectorAll('#cont_answer')
        document.querySelector('#intento_01').checked = false
        document.querySelector('#intento_02').checked = false

    } else {
        alert('              Felicitaciones \n Tu puntaje es de 10 puntos')
    }
    
}




add_eventos()

pregunta.addEventListener('dragover', e => {
    e.preventDefault()
})

pregunta.addEventListener('dragenter', e => {
    e.preventDefault()
})

pregunta.addEventListener('dragleave', e => {
    e.preventDefault()
})

pregunta.addEventListener('drop', e => {
    intentos = intentos - 1
    if(verificar_respuesta(string_res[contador], mi_opcion.innerText.toString())) {
        document.querySelector('#col_answers').removeChild(mi_opcion)
        if(intentos === 1) {
            document.querySelector('#intento_01').checked = true
        } else {
            document.querySelector('#intento_02').checked = true
        }
        console.log("Pregunta =", num_quest)
        console.log("Intentos =",intentos)
        alert('Correcto')
    } else {
        console.log("Pregunta =", num_quest)
        console.log("Intentos =",intentos)
        alert('Error')
    }
    if(intentos === 0) {
        disable_draggable()
        view_answers(string_res[contador])
        document.getElementById('boton_continuar').style.display = 'block'

    } else {
        able_draggable()
    }
})

