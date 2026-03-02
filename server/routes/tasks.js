const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// GET todas las tareas
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).populate('subjectId');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// POST crear tarea
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      userId: req.user.id,
      ...req.body
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// PUT actualizar tarea
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// DELETE eliminar tarea
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;