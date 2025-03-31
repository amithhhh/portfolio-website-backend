import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res) => {
   try {
       const { username, password } = req.body;

       // Hash password
       const hashedPassword = await bcrypt.hash(password, 10);

       // Create new user
       const newUser = new User({
           username: username,
           password: hashedPassword
       });

       await newUser.save();

       res.status(201).json({ success: true, message: "Admin registered successfully" });
   } catch (err) {
       return res.status(500).json({ success: false, error: err.message });
   }
};

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials!" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: false,
            maxAge: 3600000
        })
        res.json({message: "Login Successful"});

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};
