import express from 'express';
import CommunityTip from '../models/CommunityTip.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all community tips
router.get('/', async (req, res) => {
  try {
    const tips = await CommunityTip.find().sort({ createdAt: -1 }).populate('user_id', 'full_name');
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create community tip
router.post('/', protect, async (req, res) => {
  try {
    const tip = await CommunityTip.create({
      ...req.body,
      user_id: req.user._id,
    });
    res.status(201).json(tip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like/unlike community tip
router.put('/:id/like', protect, async (req, res) => {
  try {
    const tip = await CommunityTip.findById(req.params.id);
    
    if (tip) {
      tip.likes += 1;
      await tip.save();
      res.json(tip);
    } else {
      res.status(404).json({ message: 'Tip not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
