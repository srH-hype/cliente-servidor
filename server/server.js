const net = require('net');
const Persona = require('../persona');
const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');

const builder = new XMLBuilder
const parser = new XMLParser();
const server = net.createServer();

//cuando hay una conecciṕn
server.on('connection',(socket)=>{
    //lee los datos del cliente
    socket.on('data',(data)=>{
        //parse de xml a objeto js
        let personaCliente = parser.parse(data);
        //se muestran los datos del cliente
        console.log('\n Persona del cliente');
        console.log(data);
        console.log('Nombre: ' + personaCliente.nombre);
        console.log('Estatura: ' + personaCliente.estatura);
        console.log('Peso: ' + personaCliente.peso);
        //se calcula el IMC
        let imc = personaCliente.peso/personaCliente.estatura**2;
        personaCliente.imc = imc;
        //se indica el estado de salud del cliente
        console.log('IMC: ' + personaCliente.imc);
        if (imc < 18.6){personaCliente.resultado = 'Delgado'}
        if (imc < 25 && imc > 18.6){personaCliente.resultado = 'Saludable'}
        if (imc < 30 && imc > 25){personaCliente.resultado = 'Sobrepeso'}
        if (imc > 30){personaCliente.resultado = 'Obesidad'}
        //se imprime el resultado
        console.log('Resultado: ' + personaCliente.resultado)
        //se crea la respuesta en XML
        let personaXML = builder.build(personaCliente)
        //se le envía la rspuesta al cliente
        socket.write(personaXML);
    })
//cuando se cierra la conección
socket.on('close',()=>{
    console.log('Fin de comunicacion')
})

    socket.on('error',(err)=>{
        console.log('err.message')
    })
});

//se pone el servidor a la escucha en el puerto 8002
server.listen(8002, ()=>{
    console.log('Servidor escuchando en el puerto ',server.address().port)
})


