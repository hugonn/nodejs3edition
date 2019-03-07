const express = require('express');
const path = require('path')

const port = process.env.PORT || 3000
const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname, '../templates/partials');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// run the project automatically with heroku or NPM RUN



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

// req.query.search -> possui dados da query string
//           parametro que tu define
app.get("/products", (req,res) =>{

    if(!req.query.search){
       
        return res.send({
            error:'precisa de parametros para busca'
        })
    }
    res.send({
        products: []
    })
})

app.get("/weather", (req,res) =>{

    console.log(req.query.address)

    if(!req.query.address){
       
        return res.send({
            error:'precisa de parametros para busca'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {}) =>{

        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    // res.send({
    //     forecast: 'Its Snowing',
    //     location: "RS",
    //     address: req.query.address
    // })
})




app.get('/help/*', (req, res)=>{

    res.render('404',  {
        title: "404 - Problem",
        name: "Hugo Neto",
        errorMessage:"Help Article not Found"

    });
});

app.get('/help', (req, res)=>{
    res.render('about',  {
        title: "weather App",
        name: "Hugo Neto"

    });

});

// mostrar pagina de erro para páginas inexistentes
// nome disso é Wild Card
app.get('*', (req, res)=>{
    res.render('404',  {
        title: "404 - Problem",
        name: "Hugo Neto",
        errorMessage:"Page not Found"

    });

});



app.listen(port,() =>{
    console.log(`Server porta ${port}`);
});

