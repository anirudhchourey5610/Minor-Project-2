import express from 'express';
import Opportunity from '../models/Opportunity.js';
import VolunteerSignup from '../models/VolunteerSignup.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all opportunities
router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ date: 1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create opportunity
router.post('/', protect, async (req, res) => {
  try {
    const opportunity = await Opportunity.create({
      ...req.body,
      user_id: req.user._id,
    });
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's volunteer signups
router.get('/signups', protect, async (req, res) => {
  try {
    const signups = await VolunteerSignup.find({ user_id: req.user._id })
      .populate('opportunity_id')
      .sort({ createdAt: -1 });
    res.json(signups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sign up for opportunity
router.post('/signup', protect, async (req, res) => {
  try {
    const { opportunity_id } = req.body;

    // Check if already signed up
    const existingSignup = await VolunteerSignup.findOne({
      user_id: req.user._id,
      opportunity_id,
    });

    if (existingSignup) {
      return res.status(400).json({ message: 'Already signed up for this opportunity' });
    }

    const signup = await VolunteerSignup.create({
      user_id: req.user._id,
      opportunity_id,
      status: 'pending',
    });

    res.status(201).json(signup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel signup
router.delete('/signup/:id', protect, async (req, res) => {
  try {
    const signup = await VolunteerSignup.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (signup) {
      await signup.deleteOne();
      res.json({ message: 'Signup cancelled' });
    } else {
      res.status(404).json({ message: 'Signup not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
