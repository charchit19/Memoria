import bcrypt from 'bcryptjs';  //hashing the passsword
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            // prompt("User not exists");
            console.log("user not exist");
            return res.status(404).json({ message: "User doesn't exist." })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); //matching the password...
        console.log(isPasswordCorrect);
        if (isPasswordCorrect === false) {
            // window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
            return res.status(400).json({ message: "Invalid Credentials." })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });


    } catch (error) {
        console.log("Something went wrong")
        res.status(500).json({ message: "Something Went Wrong!" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            prompt("User already exists");
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists." })
        }

        if (password !== confirmPassword) {
            prompt("password and confirm password should be equal");
            console.log("pass != cpass");
            return res.status(400).json({ message: "password and confirm password should be same." })
        }

        const hashedPassword = await bcrypt.hash(password, 12 /* 12 is the level of hashing difficulty*/)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }


}
