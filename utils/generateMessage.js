
const generateMessage = (otp)=>{

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CollegeID - Forgot Password OTP</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h2 {
                color: #3498db;  /* Blue color */
            }
    
            p {
                color: #555;
            }
    
            .otp-container {
                margin-top: 20px;
                padding: 10px;
                background-color: #ecf0f1;  /* Light grey background */
                border-radius: 4px;
                font-size: 18px;
            }
    
            .footer {
                margin-top: 20px;
                color: #888;
                font-size: 14px;
            }
    
            strong {
                color: #e74c3c;  /* Red color */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>CollegeID- Forgot Password OTP</h2>
            <p>Hello there!</p>
            <p>We received a request to reset your password. Please use the OTP below to proceed:</p>
    
            <div class="otp-container">
                <strong>OTP: ${otp}</strong>
            </div>
    
            <p><strong style="color: #e74c3c;">Important:</strong> Please do not share this OTP with anyone. It is for your use only.</p>
    
            <p>If you didn't request a password reset, you can ignore this email.</p>
            <p>Thanks,</p>
            <p>The CollegeID Team</p>
    
            <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
            </div>
        </div>
    </body>
    </html>
    `
}

const generateMessagePass =(user)=>{
   return `
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>CollegeID - Password Changed</title>
       <style>
           body {
               font-family: 'Arial', sans-serif;
               background-color: #f4f4f4;
               margin: 0;
               padding: 0;
               box-sizing: border-box;
           }
   
           .container {
               max-width: 600px;
               margin: 20px auto;
               background-color: #ffffff;
               padding: 20px;
               border-radius: 8px;
               box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
           }
   
           h2 {
               color: #3498db;
               margin-bottom: 20px;
           }
   
           p {
               color: #555;
               line-height: 1.6;
               margin-bottom: 10px;
           }
   
           .success-message {
               margin-top: 20px;
               padding: 10px;
               background-color: #2ecc71;
               color: #ffffff;
               border-radius: 4px;
               font-weight: bold;
           }
   
           .footer {
               margin-top: 20px;
               color: #888;
               font-size: 14px;
           }
       </style>
   </head>
   <body>
       <div class="container">
           <h2>CollegeID - Password Changed</h2>
           <p>Hello <span style="color: #3498db; font-weight: bold;">${ user.name}</span>,</p>
           <p>Your password has been successfully changed for the username: <span style="font-weight: bold;"> ${ user.username}</span>.</p>
   
           <div class="success-message">
               Password Changed Successfully!
           </div>
   
           <p>Thanks,</p>
           <p>The CollegeID Team</p>
   
           <div class="footer">
               <p>This is an automated email. Please do not reply.</p>
           </div>
       </div>
   </body>
   </html>
   
   `
}

module.exports ={ generateMessage, generateMessagePass};