import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { createTeamMember, deleteTeamMember, getTeam, updateTeamMember } from '../controllers/teamController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get('/', getTeam);
router.post('/', authMiddleware, upload.single('image'), createTeamMember);
router.put('/:id', authMiddleware, upload.single('image'), updateTeamMember);
router.delete('/:id', authMiddleware, deleteTeamMember);

export default router;
