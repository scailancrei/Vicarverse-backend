
const express = require('express')
const axios = require('axios').default
const cors = require('cors');



const app = express();


app.set('port', process.env.PORT || 4000)

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use(express.static('./src'))


//routes

/**
 * Petición de datos al servidor de la API, devuelve los datos del Usuario para hacer el login
 * @param req contiene la petición del cliente
 * @param res contiene la respuesta del servidor y que es mandada al cliente.
 * @returns devuelve una respuesta asíncrona desde el servidor de la Api y que se encarga de redirigir dicha respuesta al cliente
 */
app.post('/api/index.php', async (req, res) => {

    let respuesta
    try {
        const json = {
            usuario: req.body.usuario,
            contraseña: req.body.contraseña
        }



        respuesta = await axios.post('https://vicarverse-php-api.herokuapp.com/index.php', json)

        console.log(respuesta.data)
        res.json(respuesta.data).end()

    } catch (error) {
        res.status(403).send(error)
    }

})


/**
 * Petición de datos al servidor de la API para obtener todos los usuarios
 * @param req contiene la petición del cliente
 * @param res contiene la respuesta 
 * @returns devuelve una respuesta asincrona desde el servidor
 */
app.get('/api/mostrarUsuarios.php', async (req, res) => {

    try {

        const data = await axios.get('https://vicarverse-php-api.herokuapp.com/mostrarUsuarios.php')

        console.log(data.data)
        res.json(data.data).end()

    } catch (error) {
        res.status(404).send(error)
    }

})

/**
 * Peticion de datos al servidor de la API para obtener el rol del usuario.
 * @param req contiene la peticion del cliente.
 * @param res contiene la respuesta del servidor.
 * @returns retorna en formato json la respuesta con el rol del usuario.
 */
app.get('/api/getRol.php', async (req, res) => {

    console.log(req.originalUrl)
    const usuario = req.query.usuario
    try {

        console.log(usuario)
        const { data } = await axios.get('https://vicarverse-php-api.herokuapp.com/getRol.php', {
            params: {
                usuario: usuario
            }})


        res.json(data).end()

    } catch (error) {
        res.status(404).send(error)
    }

})







/**
 * Petición de datos al servidor de la API 
 * @param req contiene la petición del cliente
 * @param res contiene la respuesta del servidor y que es mandada al cliente.
 * @returns devuelve una respuesta asíncrona desde el servidor de la Api y que se encarga de redirigir dicha respuesta al cliente
 */
app.post('/api/nuevoUser.php', async function (req, res) { //cuando se accede a la ruta api/index.php recogemos los datos del usuario


    // Obtenemos los campos usuario, contraseña e email del body que serán usadas para enviar como petición a la API
    const usuario = req.body.usuario
    const contraseña = req.body.contraseña
    const email = req.body.email
    try {
        //Devuelve una respuesta asíncrona
        return await axios({
            method: 'POST',
            url: 'https://vicarverse-php-api.herokuapp.com/nuevoUser.php',
            data: {
                usuario: usuario,
                email: email,
                contraseña: contraseña

            },
            headers: {
                'Content-type': 'application/json'
            }
        })
            //Si se recibe respuesta desde la API...
            .then((response) => {
                const { data } = response
                if (data) {

                    console.log(data)
                    res.send(data)
                } else {    //Si no se recibe la respuesta
                    res.send(console.log('no hay respuesta'))
                }
            })

    } catch (e) {
        console.log(e.stack)
        res.status(500).send({ error: e.message })
    }

})

/**
 * Obtener el rol y el usuario de la request para poder modificar el rol de dicho usuario
 */
app.post('/api/modificarUsuario.php', async function (req, res) {

    const usuario = req.body.usuario
    const rol = req.body.rol
    try {
        //Devuelve una respuesta asíncrona
        return await axios({
            method: 'POST',
            url: 'https://vicarverse-php-api.herokuapp.com/modificarUsuario.php',
            data: {
                usuario: usuario,
                rol: rol
            },
            headers: {
                'Content-type': 'application/json'
            }
        })
            //Si se recibe respuesta desde la API...
            .then((response) => {
                const { data } = response
                if (data) {

                    console.log(data)
                    res.send(data)
                } else {    //Si no se recibe la respuesta
                    res.send(console.log('no hay respuesta'))
                }
            })

    } catch (e) {
        console.log(e.stack)
        res.status(500).send({ error: e.message })
    }
})

/**
 * Obtener el usuario para eliminarlo de la base de datos
 */
 app.post('/api/borrarUsuario.php', async function (req, res) {

    const usuario = req.body.usuario
    try {
        //Devuelve una respuesta asíncrona
        return await axios({
            method: 'POST',
            url: 'https://vicarverse-php-api.herokuapp.com/borrarUsuario.php',
            data: {
                usuario: usuario
            },
            headers: {
                'Content-type': 'application/json'
            }
        })
            //Si se recibe respuesta desde la API...
            .then((response) => {
                const { data } = response
                if (data) {

                    console.log(data)
                    res.send(data)
                } else {    //Si no se recibe la respuesta
                    res.send(console.log('no hay respuesta'))
                }
            })

    } catch (e) {
        console.log(e.stack)
        res.status(500).send({ error: e.message })
    }
})





//Servidor iniciado
app.listen(app.get('port'), () => {
    console.log('El puerto es: ', app.get('port'))

})