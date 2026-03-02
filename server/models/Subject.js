const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  name: String,
  score: Number,
  maxScore: { type: Number, default: 100 },
  weight: Number,
  date: Date
});

const subjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  color: { type: String, default: '#4A90E2' },
  credits: Number,
  semester: String,
  professor: String,
  grades: [gradeSchema]
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);