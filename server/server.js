const net = require('net');
const Persona = require('../persona');
const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');

const parser = new XMLParser();
const server = net.createServer();



server.on('connection',(socket)=>{
    socket.on('data',(data)=>{
        let personaCliente = parser.parse(data);
        console.log('Persona del cliente');
        console.log('Nombre: ' + personaCliente.nombre);
        console.log('Estatura: ' + personaCliente.estatura);
        console.log('Peso: ' + personaCliente.peso);
        let imc = personaCliente.peso/personaCliente.estatura**2;
        personaCliente.imc = imc;
        console.log('IMC: ' + personaCliente.imc);
        if (imc < 18.6){console.log('Delgado')}
        if (imc < 25 && imc > 18.6){console.log('Saludable')}
        if (imc < 30 && imc > 25){console.log('Sobrepeso')}
        if (imc > 30){console.log('Obesidad')}
        socket.write('Recivido');
    })

socket.on('close',()=>{
    console.log('Fin de comunicacion')
})

    socket.on('error',(err)=>{
        console.log('err.message')
    })
});

server.listen(700, ()=>{
    console.log('Servidor escuchando en el puerto ',server.address().port)
})
