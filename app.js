const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()


app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended: true}))


app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html')
})


app.post('/', function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }, 
        ]
    }

    var jsonData = JSON.stringify(data);

    //console.log(firstName,lastName,email)

    var options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/33e5081242',
        method: 'post',
        headers: {
            'Authorization': 'javi1 13ebbcc9e7b3b95757f293d40113918f-us20'
        },

        body: jsonData

    }

    request(options, function(error, response, body){
       if(error){
           res.sendFile(__dirname + "/failure.html")
       } else {
           if(response.statusCode === 200){
               res.sendFile(__dirname + "/success.html")
           } else {
            res.sendFile(__dirname + "/failure.html")
           }
       }

    })

})

app.post('/failure', function(req,res){
    res.redirect('/');
})


app.listen(process.env.PORT || 3000,function(req,res){
    console.log('newsletter kcco')
})

//13ebbcc9e7b3b95757f293d40113918f-us20

// audience id 33e5081242