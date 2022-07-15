var nodemailer = require('nodemailer');
var config = require('../config.js');

function email(email, asunto, texto){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL.email,
          pass: config.EMAIL.password
        }
      });
      
      var mailOptions = {
        from: config.EMAIL.email,
        to: email,
        subject: asunto,
        text: texto
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


}


module.exports={

    email
}