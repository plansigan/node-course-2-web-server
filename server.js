var express = require('express'),
    app     = express(),
    hbs     = require('hbs'),
    fs      = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use((req,res,next)=>{
  var now = new Date().toString(),
      log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server log.')
    }
  })
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance');
// });

//use public folder
app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res) => {
  res.send('hello')
});

app.get('/about',(req,res) => {
  res.render('about',{
    pageTitle:'About Page',
    currentYear:new Date().getFullYear()
  })
})

app.get('/home',(req,res)=>{
  res.render('home',{
    pageTitle:'Home Page',
    welcomeMessage:"Hello There",
    currentYear:new Date().getFullYear()
  });
})
// /bad - send back json with errorMessage property

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'bad request'
  });
})

app.listen(3000,() => {
  console.log('server is up and running at port 3000')
});
