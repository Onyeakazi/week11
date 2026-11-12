const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Boolean, enum: ["user", "admin"], default: "user"}
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

userSchema.method.isMatchPassword = async function(password){
    return await bcryptjs.compare(password, this.password);
}

module.exports = mongoose.Model("User", userSchema);