require('dotenv').config()

require('colors');


const { inquirerMenu, pausa, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');




const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:

                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                //buscar lugares
                const lugares = await busquedas.ciudad(termino);

                // selecciona lugar 
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                busquedas.agregarHistorial(lugarSel.nombre);

                //clima 
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                console.clear();
                console.log('\nDatos de la Ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Latitud:', lugarSel.lat);
                console.log('Longitud:', lugarSel.lng)
                console.log('Temperatura: ', clima.temp);
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Como está el clima:', clima.desc);
                break;


            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar } `);
                })
                break;
        }

        await pausa();
    } while (opt !== 0);
}

main();