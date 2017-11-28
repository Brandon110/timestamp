var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'html');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

function month_name(data) {
    var mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return mlist[data.getMonth()];
}


app.get('/timeVal/:dateVal', function(req, res, next) {
    var dateVal = req.params.dateVal;

    if (isNaN(dateVal) === true) {
        var naturalTime = month_name(new Date(dateVal));
        naturalTime += new Date(dateVal).toString().slice(7, 10);
        naturalTime += ", " + new Date(dateVal).toString().slice(11, 15);
        var unixTime = new Date(naturalTime).getTime() / 10000;
    }
    else {
        var unixTime = new Date(+dateVal * 1000).getTime();
        var naturalTime = month_name(new Date(unixTime));
        naturalTime += new Date(unixTime).toString().slice(7, 10);
        naturalTime += ", " + new Date(unixTime).toString().slice(11, 15);
    }

    naturalTime.slice(0, 9) === 'undefined' ? naturalTime = null : naturalTime;


    res.json({ natural: unixTime, unix: naturalTime });
});


app.listen(process.env.PORT);
