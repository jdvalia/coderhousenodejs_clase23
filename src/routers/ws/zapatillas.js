import zapatillasApi from '../../api/zapatillas.js'

export default async function configurarSocket(socket, sockets) {
    socket.emit('zapatillas', await zapatillasApi.listarAll());

    socket.on('update', async zapatilla => {
        await zapatillasApi.guardar(zapatilla)
        sockets.emit('zapatillas', await zapatillasApi.listarAll());
    })
}