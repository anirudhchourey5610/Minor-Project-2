import express from 'express';
import Resource from '../models/Resource.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's resources
router.get('/my-resources', protect, async (req, res) => {
  try {
    const resources = await Resource.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create resource
router.post('/', protect, async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      user_id: req.user._id,
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete resource
router.delete('/:id', protect, async (req, res) => {
  try {
    const resource = await Resource.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (resource) {
      await resource.deleteOne();
      res.json({ message: 'Resource removed' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
