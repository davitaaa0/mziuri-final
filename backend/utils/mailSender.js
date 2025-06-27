import nodemailer from "nodemailer";

const mailSender = async (from, to, url) => {
    let transporter = null
    try{
        transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: from,
            pass: process.env.MAIL_SENDER_PASS 
        }
    })}
    catch(err){
        console.log(err)
    }
    const mailOptions = {
        from: from,
        to: to,
        subject: "[Pronia] Password Reset",
        html: `
        <div style="width: 100%; background-color: rgb(250, 250, 250); text-align: center">
            <br>
            <a href="https://davitaspronia.onrender.com/" style="text-align: center; font-size: 26px; color: #abd373; text-decoration: none;font-weight: bold">Pronia</a>
            <br>
            <br>
            <div style="font-size: 16px; margin: 0 auto; width: 50%; color: black; background-color: white; padding: 40px; ">
                <div style="margin-bottom: 20px;">Someone requested to reset the password for the following account:</div>
                <div style="margin-bottom: 20px;">If this was a mistake, just ignore this email and nothing will happen.</div>
                <div style="margin-bottom: 30px;">To reset your password, click the button below.</div>
        
                <a href=${url} style="text-align: center; font-size: 15px; text-align: center; background-color: #abd373; padding: 10px 24px; text-decoration: none; border-radius: 3px; color:white">Reset Password</a>
            </div>
            <br>
            <br>
            <p>© ${new Date().getFullYear()} Pronia LLC</p>
            <p>All rights reserved.</p>
            <br>
            <br>
        </div>
        `
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (err) {
        console.log("Error sending email:", err);
    }
}

export default mailSender