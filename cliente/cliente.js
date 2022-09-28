const net = require('net');
const Persona = require('../persona');
const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');

const builder = new XMLBuilder
let personaNueva = new Persona('Pepe',1.70,100)
let personaXML = builder.build(personaNueva)

const option = {
    port: 700
}

const client = net.createConnection(option)

client.on('connect', ()=>{
    console.log('Conectado');
    client.write(personaXML);
})

client.on('error',(err)=>{
    console.log(err.message);
})

