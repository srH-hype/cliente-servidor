const net = require("net");
const Persona = require("../persona");
const readline = require('readline-sync')
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
//el puerto a usar
const option = {
    port: 8002,
};

const client = net.createConnection(option);

const parser = new XMLParser();
const builder = new XMLBuilder();

//se conecta al servidor
client.on("connect", () => {
    console.log("Conectado");
    sendPersona()
});
//cuando se reciben datos del servidor
client.on("data", (data) => {
    let personaServidor = parser.parse(data);
    console.log("\n Persona del Servidor");
    console.log("Nombre: " + personaServidor.nombre);
    console.log("Estatura: " + personaServidor.estatura);
    console.log("Peso: " + personaServidor.peso);
    console.log("IMC: " + personaServidor.imc);
    console.log('Resultado: ' + personaServidor.resultado)
    //envía la persona para calcular el IMC
    sendPersona()
});
//si ocurre un error
client.on("error", (err) => {
    console.log(err.message);
});
//envía la persona al servidor
function sendPersona(){
    //pide los datos del cliente
    let nombre = readline.question('\n Nombre: ')
    let estatura = readline.question('\n Estatura: ')
    let peso = readline.question('\n Peso: ')
    //crea la persona
    let personaNueva = new Persona(nombre, estatura, peso);
    //crea un XML con los datos de la persona
    let personaXML = builder.build(personaNueva);
    //si se desea terminar la coneción
    if (nombre == '0'){
        client.end();
    }else{
        //envía los datos al servidor
    client.write(personaXML);}
}

