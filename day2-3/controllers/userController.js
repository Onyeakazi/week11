const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

exports.register = async (req, res)=> {
    try{
        const {name, email, password, role} = req.body;

        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({error: "User already exists"});

        const user = await User.create({name, email, password, role});
        const token = generateToken(user._id);

        res.status(201).json({message: "User created", token});
    }catch(error){
        res.status(401).json({error: error.message});
    }
}

exports.login = async (req, res)=> {
    try{
        const {email, password} = req.body;

        if(!email || !password) return res.status(401).json({error: "Fill all field!"});

        const userExist = await User.findOne({email});
        if(!userExist || !(await userExist.comparePassword(password))) return res.status(400).json({error: "Invalid credentials"});

        const token = generateToken(userExist._id);

        res.status(200).json({message: "Login successful", token});
    }catch(error){
        res.status(401).json({error: error.message});
    }
}

exports.profile = (req, res) => {
    res.status(200).json({Message: "This is your profile page"});
}

exports.adminDashboard = (req, res) => {
    res.status(200).json({Message: "Welcome to the admin dashboard!"});
}