// models/UserAdmin.js

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  nomAdmin: {
    type: String,
    required: true,
  },
  mailAdmin: {
    type: String,
    required: true,
    unique: true,
  },
  passwordAdmin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
