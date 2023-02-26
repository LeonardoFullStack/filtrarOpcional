document.addEventListener('DOMContentLoaded', (event) => {
    /*  crear los botones de forma dinámica en un form 
    crear un objeto de arrays con los datos */

    const fotos = {
        viaje1: { url: 'fotos/viajes-1.jpg', title: 'este es el viaje 1', tags: ['mar', 'cielo', 'relax', 'palmera'] },
        viaje2: { url: 'fotos/viajes-2.jpg', title: 'este es el viaje 2', tags: ['mar', 'cielo', 'casas', 'madera'] },
        viaje3: { url: 'fotos/viajes-3.jpg', title: 'este es el viaje 3', tags: ['cielo', 'madera', 'señales'], },
        viaje4: { url: 'fotos/viajes-4.jpg', title: 'este es el viaje 4', tags: ['arquitectura', 'relax', 'agua'] },
        viaje5: { url: 'fotos/viajes-5.jpg', title: 'este es el viaje 5', tags: ['agua', 'arquitectura', 'casas',] },
        viaje6: { url: 'fotos/viajes-6.jpg', title: 'este es el viaje 6', tags: ['mar', 'cielo', 'montaña'] },
        viaje7: { url: 'fotos/viajes-7.jpg', title: 'este es el viaje 7', tags: ['casas', 'cielo', 'arquitectura'] },
    }

    const tags = ['agua', 'cielo', 'mar', 'relax', 'montaña', 'casas', 'arquitectura', 'madera', 'palmera', 'desierto'];
    const botones = document.querySelector('#botones');
    const container = document.querySelector('#container');
    const info = document.querySelector('#info');
    const cuadroPresentar = document.querySelector('#presentar')
    let arrayFotos;
    let condEnt = false;


    botones.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (ev.target.matches('button')) {
            buscar(ev.target.id);
        }

    })
    container.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (ev.target.matches('img')) {
            presentar(ev.target.id);
            condEnt = true;
        }
    })
    //creando botones (molaria con un DOMloaded)
    const pintarBotones = () => {
        const form = document.createElement('FORM');
        form.setAttribute('id', 'formulario');
        botones.append(form);
        const formulario = document.querySelector('#formulario');
        tags.forEach((item) => {
            const boton = document.createElement('button')
            boton.setAttribute('id', item);
            boton.textContent = item
            formulario.append(boton);
        })
    }

    const buscar = (boton) => {
        arrayFotos = [];
        for (let key in fotos) {
            if (fotos[key].tags.includes(boton)) {
                arrayFotos.push(key)
            }
        }
        if (arrayFotos.length == 0) {
            pintarViajes([]);

        } else {
            pintarViajes(arrayFotos);
        }
    }

    const pintarViajes = (array) => {

        if (array.length == 1 && condEnt == true) {
            presentar.innerHTML= '';
            container.innerHTML = '';
        condEnt= false;
            arrayFotos.forEach((item) => {
                if (item != array) {


                    const article = document.createElement('ARTICLE');
                    const img = document.createElement('IMG');
                    img.setAttribute('id', item);
                    const h2 = document.createElement('H2');
                    img.setAttribute('src', fotos[item].url);
                    h2.textContent = fotos[item].title
                    article.append(img)
                    article.append(h2)
                    container.append(article);
                }
            })

        } else {
            cuadroPresentar.innerHTML = '';
            container.innerHTML = '';
            info.innerHTML = '';
            const infoP = document.createElement('P');
            infoP.textContent = 'Se han encontrado ' + array.length + ' fotos.';
            info.append(infoP)
            array.forEach((item) => {
                const article = document.createElement('ARTICLE');
                const img = document.createElement('IMG');
                img.setAttribute('id', item);
                const h2 = document.createElement('H2');
                img.setAttribute('src', fotos[item].url);
                h2.textContent = fotos[item].title
                article.append(img)
                article.append(h2)
                container.append(article);

            })
        }
    }


    const presentar = (viaje) => {
        cuadroPresentar.innerHTML = '';
        let imagen = [viaje]
        const divPresentar = document.querySelector('#presentar');
        const img = document.createElement('IMG');
        img.setAttribute('src', fotos[viaje].url);
        img.classList.add(viaje)
        divPresentar.append(img)
        pintarViajes(imagen);

    }


    pintarBotones();

}) //load

/* etiquetas en  común:  agua , cielo, relax, arquitectura, montaña, casas, madera */
/* añadir a esos botones una clase, que será el que contenga la información del que se va a buscar.
ejecutar una función que busque esa clase en el objeto, y junte las fotos en un conjunto de parámetros,para
llamar a otra función que lo pinte.También hay que mostrar un mensaje de tantas imágenes .en caso de que no haya, que mande el parámetro a pintar().
la función pintar, pintará en articles cuantos parámetros se le mande*/