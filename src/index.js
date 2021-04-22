const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const transaccionRoute = require("../routes/preTransaccion.routes");


//settings
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({ message: "app works" });
});



//routes
app.use(transaccionRoute);

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})