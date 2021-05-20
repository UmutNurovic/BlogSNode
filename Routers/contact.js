const router = require('express').Router();
const nodemailer = require("nodemailer");

router.post('/email',(req,res)=>{
    const outPutHtml = `
    <h2> Mail Details </h2>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3> Message</h3>
    <p>${req.body.message}</p>
    `;
    async function main() {
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'yodaw2155@gmail.com',
            pass: '0019958246s', // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Node Project contact from " <yodaw2155@gmail.com>', // sender address
          to: "node yodaw2155@gmail.com", // list of receivers
          subject: "DarkPinkman", // Subject line
          text: "Hello world?", // plain text body
          html: outPutHtml
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.redirect('/contact');
    }
      main().catch(console.error);
    
});

module.exports= router;