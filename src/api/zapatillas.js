import config from '../config.js'
import ContenedorArchivo from '../contenedores/ContenedorArchivo.js'

const zapatillasApi = new ContenedorArchivo(`${config.fileSystem.path}/zapatillas.json`)

export default zapatillasApi