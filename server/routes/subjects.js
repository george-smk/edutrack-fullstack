const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const auth = require('../middleware/auth');

// GET todas las materias
router.get('/', auth, async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user.id });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// POST crear materia
router.post('/', auth, async (req, res) => {
  try {
    const subject = new Subject({
      userId: req.user.id,
      ...req.body
    });
    await subject.save();
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// PUT actualizar materia
router.put('/:id', auth, async (req, res) => {
  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// DELETE eliminar materia
router.delete('/:id', auth, async (req, res) => {
  try {
    await Subject.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Materia eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;