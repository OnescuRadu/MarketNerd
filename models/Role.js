const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;