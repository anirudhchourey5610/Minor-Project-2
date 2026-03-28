import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.full_name = req.body.full_name || user.full_name;
      user.location = req.body.location || user.location;
      user.skills = req.body.skills || user.skills;
      user.interests = req.body.interests || user.interests;
      user.avatar_url = req.body.avatar_url || user.avatar_url;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        full_name: updatedUser.full_name,
        location: updatedUser.location,
        skills: updatedUser.skills,
        interests: updatedUser.interests,
        avatar_url: updatedUser.avatar_url,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
