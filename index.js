const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index');
const path = require('path');
//const control = require('./controllers/UserController.js')


const bodyParser = require('body-parser');


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))



app.set('port', process.env.PORT || 3000);
app.use('/api', router);


if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log('Server on port ' + app.get('port') + ' on dev');
    });
}

module.exports = app;