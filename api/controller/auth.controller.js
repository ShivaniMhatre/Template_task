import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    const { email, password } = req.body;
    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
        return res.status(400).json({
            success: false,
            message: "Email already exist"
        })
    }
    const hashPass = bcryptjs.hashSync(password, 10)
    const user = await User.create({ email, password: hashPass })
    try {
        await user.save();
        res.status(200)
            .json({
                success: true,
                message: "User Created Successfully"
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error Creating User",
            error: error.message
        })
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        const isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = user._doc;
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({
                success: true,
                message: "User Login Successfully",
                rest
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error Logging In User",
            error: error.message
        })
    }

}