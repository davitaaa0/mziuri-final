import jwt from 'jsonwebtoken';
import Users from '../models/users.js';
import bcrypt from 'bcrypt'


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmail = email.includes('@');

        let user;
        if (isEmail) {
            user = await Users.findOne({ email: email });
        }
 
        if (!user) {
            return res.status(404).json({ err: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password + process.env.BCRYPT_PEPPER, user.password)

        if(!isPasswordValid) {

            return res.json({ err: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ data: 'User has logged out' });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

export const getToken = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({ err: 'Please login now!' });

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(400).json({ msg: 'Please login now!' });
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
    
};

export const getUser = async (req, res) => {
    try {
        const token = req.header('Authorization');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        const userData = await Users.findById(userId).select('-password');
        res.status(200).json({ data: userData });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const emailExists = await Users.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ err: 'Email is already in use' });
        }

        const isEmail = email.includes('@')
        if(!isEmail) {
            console.log("Entered email:", email)
            return res.status(400).json({err:'Email should contain @'})
        }


        const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_PEPPER, 10)

        const newUser = new Users({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newUser.save()

        // Users.create()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 });

        res.status(201).json({ data: newUser });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};



export const updateUser = async (req, res) => {
    try {
        const { userId, newInfo } = req.body;
        let updatedUser;
        try {
            let hashedPass;
            if(newInfo.newPassword.length)  hashedPass = await bcrypt.hash(newInfo.newPassword + process.env.BCRYPT_PEPPER, 11);  
            
            let updatedData;
            if(hashedPass) 
            {
                updatedData = {
                    email: newInfo.newEmail,
                    password: hashedPass  
                };
            }
            else {
                updatedData = {
                    email: newInfo.newEmail,
                };
            }

            updatedUser = await Users.findByIdAndUpdate(userId, updatedData, { new: true });
            return res.status(200).json({ updatedUser: updatedUser });
        } catch(err) {
            console.log(err);
            return res.status(500).json({ err: err });
        }
    } catch(Err) {
        return res.status(500).json({ err: Err });
    }
}