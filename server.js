/************/
/*Set up static file server*/
let static = require('node-static');

/*set up http server*/
let http = require('http');

/*assume that we are running on heruko*/
let port = process.env.PORT;
let directory = __dirname + '/public';

/*If we are not on Heroku, we need to adjust port*/
if ((typeof port == 'undefined') || ( port === null)){
    port = 8080;
     directory = './public';
}

/* set up static file web server*/
let file = new static.Server(directory);

let app = http.createServer(
    function(request,response){
        request.addListener('end',
        function(){
            file.serve(request,response)
        }
        ).resume();
    }
).listen(port);

console.log('The server is running');