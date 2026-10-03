import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  experienceYears: { type: String },
  accolades: { type: String },
  quote: { type: String }
}, { timestamps: true });

export default mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
