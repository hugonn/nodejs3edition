const express = require('express');
const path = require('path')

const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname, '../templates/partials');
const hbs = require('hbs');


app.set('view engine', 'hbs');
//troca do caminho das views no handlebars
app.set('views',viewsPath);
app.use(express.static(publicPath));

// Footer, header, todos htmls que serão utilizados em mais de uma página
hbs.registerPartials(partialsPath);

// Handle bars serve para colocar conteudo dinamicamente entre paginas html

// dependendo da requisição do browser, vai para alguma pagina ou devolve algum objeto
app.get('', (req, res)=>{

    // Argumentos dinamicos para pagina
    res.render('index',  {
        title: "weather App",
        name: "Hugo Neto"

    });
});

app.get('/about', (req, res)=>{
    res.render('about',  {
        title: "weather App",
        name: "Hugo Neto"

    });

});

app.get('/weather', (req, res)=>{


});

app.listen(3000);
console.log("Server porta 3000");
