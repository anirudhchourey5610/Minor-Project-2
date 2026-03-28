import mongoose from 'mongoose';

const volunteerSignupSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  opportunity_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const VolunteerSignup = mongoose.model('VolunteerSignup', volunteerSignupSchema);

export default VolunteerSignup;
