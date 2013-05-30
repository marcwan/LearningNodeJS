
var express = require('express');
var app = express();

app.use(express.basicAuth(auth_user));


app.get('/', function(req, res){
  res.send('secret message that only auth\'d users can see\n');
});

app.listen(8080);


function auth_user(user, pass) {
    if (user == 'marcwan'
        && pass == 'gobbeledy goonk!') {
        return true;
    } else {
        return false;
    }
}

