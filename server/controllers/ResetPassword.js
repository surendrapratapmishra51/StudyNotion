const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto")



// resetPasswordToken
exports.resetPasswordToken = async (req,res) =>{
    try{

        // get email from req body 
        const email = req.body.email;

    // check user for this email, email validation
    const user = await User.findOne({ email: email });
    if(!user){
        return res.json({success:false,
            message:`This Email: ${email} is not Registered With Us Enter a Valid Email `,
        });
    }
    // generate token 
    const token = crypto.randomBytes(20).toString("hex")

    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate({
        email:email},
    {
        token:token,
        resetPasswordExpires:Date.now() + 3600000,
    },
        {new:true});

         console.log("DETAILS", updatedDetails)
    // create url
        const url = `http://locallost:3000/update-password/${token}`

    // send mail containing the url
    await mailSender(email,
                    "Password reset Link",
                    `Password Reset Link: ${url}`);
    // return response
    return res.status(200).json({
        success:true,
        token,
        message:'Email sent Successfully,please check email and change password'

    })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending pwd reset mail'
        })
    }
}

// resetPasswords

exports.resetPassword = async (req, res) => {
   try {
     // data fetch 
    const {password, confirmPassword,token} = req.body;
    //  validation
    if(confirmPassword !== password){
        return res.json({
            success:false,
            message:'Password and confirm Password not matching',
        });
    }
    // get userdetails from db using token
    const userDetails = await User.findOne({token:token});
    // if no entry -> invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:'Token is invalid',
        });
    }
    // check token time
    if(!userDetails.resetPasswordExpires > Date.now()){
        return res.status(403).json({
            success:false,
            message:'Token is expired, please regenerate you token',
        });
    }
    // hash password 
    const encryptedPassword = await bcrypt.hash(password,10);

    //update password
    await User.findOneAndUpdate(
        {token:token},
        {password:encryptedPassword},
        {new:true},
    );
    // return response
    return res.status(200).json({
        success:true,
        message:'Password reset successfull',
    });
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'Something went wrong while sending rest pwd mail'
    });
   }
}


