const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/algamoney-course-ui'));

app.get('/*', function(request, response){
  response.sendFile(__dirname + '/dist/algamoney-course-ui/index.html');
}); 

app.listen(process.env.PORT ||4200);
