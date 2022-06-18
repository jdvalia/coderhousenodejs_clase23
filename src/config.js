export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://equipo9:Lj30sffXYx13Zy4V@cluster0.tferq.mongodb.net/?retryWrites=true&w=majority'
    },
    fileSystem: {
        path: './DB'
    }
}

