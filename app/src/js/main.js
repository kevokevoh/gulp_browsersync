var $ = require('jquery');
$.ajax({
    url: 'http://google.com',
    method: 'GET',
    crossDomain: true,
    statusCode:{
        200: function(response){
            console.log(response);
        }

    }
});
