const sgMail = require('@sendgrid/mail');
const twilio = require('twilio')('ACda89ec4cfdabcdacc2fcb3a131b26bf9','f185f7f49644fb75feb0ca58196d30f2');
sgMail.setApiKey('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');

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:'samarth.gugnani30@gmail.com',
        from:'samarth.gugnani30@gmail.com',
        subject:'order confirmed from rare',
        text:`welcome to the app, ${name}.we will contact you as soon as possible`
    });
}

const sendtasks = (description)=>{
    sgMail.send({
        to:'arpitsinglapersonal@gmail.com',
        from:'samarth.gugnani30@gmail.com',
        subject:'order confirmed from rare',
        text:`welcome to the app, your order with description : ${description} is bookes our delivery boy will pickup today onwards between 10:00 AM - 8:00 PM`
    })
}

const sendRareCustomer = (name,number,phoneBrand,phoneModel,PhoneColor,PhoneDefects)=>{
    sgMail.send({
        to:'arpitsinglapersonal@gmail.com',
        from:'samarth.gugnani30@gmail.com',
        subject:'order confirmed from rare',
        text:`Welcome to our app : ${name}\n`,
        html:`<h2>Welcome to our app : ${name}</h2>
              <h2>your order with description:</h2> 
              <h3>phone brand: ${phoneBrand}<h3> 
              <h3>phone Model: ${phoneModel}</h3> 
              <h3>phone color: ${PhoneColor}</h3> 
              <h3>phone defects :${PhoneDefects}</h3>
              <h2>is booked we will try to contact with you as soon as possible on phone number : ${number}</h2>`
    })
}

twilio.messages
  .create({
     body: 'hello arpit we are from rare your order has been booked succesfully',
     from: '+15859024102',
     to: '+919896178450'
   })
  .then(message => console.log(message.sid));

module.exports={
    sendWelcomeEmail,
    sendtasks,
    sendRareCustomer
}

