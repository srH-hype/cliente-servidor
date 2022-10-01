const net = require("net");
const Persona = require("../persona");
const readline = require('readline-sync')
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

const option = {
    port: 700,
};

const client = net.createConnection(option);

const parser = new XMLParser();
const builder = new XMLBuilder();

client.on("connect", () => {
    console.log("Conectado");
    sendPersona()
});

client.on("data", (data) => {
    let personaServidor = parser.parse(data);
    console.log("\n Persona del Servidor");
    console.log("Nombre: " + personaServidor.nombre);
    console.log("Estatura: " + personaServidor.estatura);
    console.log("Peso: " + personaServidor.peso);
    console.log("IMC: " + personaServidor.imc);
    console.log('Resultado: ' + personaServidor.resultado)
    sendPersona()
});

client.on("error", (err) => {
    console.log(err.message);
});

function sendPersona(){
    let nombre = readline.question('\n Nombre: ')
    let estatura = readline.question('\n Estatura: ')
    let peso = readline.question('\n Peso: ')
    let personaNueva = new Persona(nombre, estatura, peso);
    let personaXML = builder.build(personaNueva);
    if (nombre == '0'){
        client.end();
    }else{
    client.write(personaXML);}
}

