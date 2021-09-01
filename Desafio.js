import express from 'express';
import fs from 'fs';

const app = express();
const puerto = 8080;
let visitasSitio1 = 0;
let visitasSitio2 = 0;

const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));

app.get('/items', (req,res)=>{
    console.log('request a get recibido!');

    fs.readFile('./productos.txt', 'utf-8', (error, data) => {
        if (error) {
            console.log('Hubo un error en la lectura del archivo');    
        } else {
            data = JSON.parse(data);
            let info = {
                "productos" : data,
                "cantidad" : data.length,
            }
            visitasSitio1++;
            res.json(info);
        }
})})

app.get('/visitas', (req,res)=>{
    console.log('request a get recibido!');

    let visitas = {
        "visitas" : {
            "items" : visitasSitio1,
            "item-random" : visitasSitio2,
        }
    }
    res.json(visitas);
});

app.get('/item-random', (req,res) => {
    console.log('request a get recibido!')
    
    fs.readFile('./productos.txt', 'utf-8', (error, data) => {
        if (error) {
            console.log('Hubo un error en la lectura del archivo');    
        } else {
            data = JSON.parse(data);
            const random = Math.floor(Math.random() * data.length);
            let info = {
                "producto" : data[random],
            }
            visitasSitio2++;
            res.json(info);
        }
})})