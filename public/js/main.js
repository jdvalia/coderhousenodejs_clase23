const socket = io.connect();
const formAgregarZapatilla = document.getElementById('formAgregarZapatilla')
formAgregarZapatilla.addEventListener('submit', e => {
    e.preventDefault()
    const zapatilla = {
        title: formAgregarZapatilla[0].value,
        price: formAgregarZapatilla[1].value,
        thumbnail: formAgregarZapatilla[2].value
    }
    socket.emit('update', zapatilla);
    formAgregarZapatilla.reset()
})

function makeHtmlTable(zapatillas) {
    return fetch('plantillas/tabla-zapatillas.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ zapatillas })
            return html
        })
}

socket.on('zapatillas', zapatillas => {
    makeHtmlTable(zapatillas).then(html => {
        document.getElementById('zapatillas').innerHTML = html
    })
});


const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });
const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' })
const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })
const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')
const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value
        },
        text: inputMensaje.value
    }

    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajesN => {

    const mensajesNsize = JSON.stringify(mensajesN).length
    console.log(mensajesN, mensajesNsize);
    const mensajesD = normalizr.denormalize(mensajesN.result, schemaMensajes, mensajesN.entities)
    const mensajesDsize = JSON.stringify(mensajesD).length
    console.log(mensajesD, mensajesDsize);
    const porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
    console.log(`Porcentaje de compresión ${porcentajeC}%`)
    document.getElementById('compresion-info').innerText = porcentajeC
    console.log(mensajesD.mensajes);
    const html = makeHtmlList(mensajesD.mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b style="color:red;">${mensaje.author.email}</b>
            [<span style="color:yellow;">${mensaje.fyh}</span>] :
            <i style="color:green;">${mensaje.text}</i>
        </div>
    `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
