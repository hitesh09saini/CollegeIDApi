
const createMessage = (username, branch, semester, img)=>{
   return  `<!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title> CollegeID :- College ID Creation Confirmation</title>
       <style>
         body {
               font-family: 'Arial', sans-serif;
               background-color: #f4f4f4;
               margin: 0;
               padding: 20px;          
   
           }
   
           
           .container {
               border:2px solid #9515b4;
               max-width: 600px;
               margin: 0 auto;
               background-color: #ffffff;
               padding: 20px;
               border-radius: 5px;
               box-shadow:inset 0 0 0px rrgba(146, 42, 172, 0.555)
           }
   
           h2 {
               color: #0066cc;
               display: flex;
               justify-content: center;
               align-items: center;
           }
   
           ul {
               list-style-type: none;
               padding: 0;
           }
   
           li {
               margin-bottom: 10px;
           }
   
           img {
               width: 200px;
               height: 200px;
               background-position: center;
               background-repeat: none;
               border-radius: 50%;
               margin-top: 15px;
           }
   
           p {
               margin-top: 15px;
           }
   
           p:last-child {
               margin-bottom: 0;
           }
   
           .signature {
               margin-top: 20px;
               font-style: italic;
               color: #888;
           }
   
           .span{
             margin: 0px;
             background-color: #9515b4;
             color: #ffffff;
             padding: 5px;
             margin-right: 10px;
             padding-inline: 10px;
           }
   
       </style>
   </head>
   
   <body>
       <div class="container">
           <h2><div class="span">CollegeID</div> Creation Confirmation</h2>
           <p>Congratulations! You have successfully created your College ID.</p>
           <p>Your details:</p>
           <ul>
               <li><strong>Username:</strong> ${username}</li>
               <li><strong>Branch:</strong> ${branch}</li>
               <li><strong>Semester:</strong> ${semester}</li>
           </ul>
           <p>Here is your College:</p>
           <img src= "${img}" alt="Image">
   
           <p>If you have any questions, feel free to contact us. We look forward to your continued success!</p>
   
           <p>Best regards,<br>CollegeID</p>
       </div>
   </body>
   
   </html>`
}

module.exports = createMessage;