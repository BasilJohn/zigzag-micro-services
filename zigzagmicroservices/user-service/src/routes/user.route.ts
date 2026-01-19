import express from 'express'
import { login, signup, deleteUser, getUserProfile, updateUserInfo, getAllUsersExceptCurrent } from '../controllers/controller.user'
import { createUserBio, updateUserBio, getUserBio } from '../controllers/controller.userbio'

const router = express.Router()

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'User router is working!' })
})

// Public routes (no authentication required)
router.post('/login', login)
router.post('/signup', signup)

// Protected routes (authentication handled at API Gateway level)
// Note: This route must come before /:id to avoid route conflicts
router.get('/discover/all', getAllUsersExceptCurrent)
router.get('/:id', getUserProfile)
router.patch('/:id', updateUserInfo)
router.delete('/:id', deleteUser)

//User Bio (protected routes)
router.post('/:id/bio', createUserBio)
router.patch('/:id/bio', updateUserBio)
router.get('/:id/bio', getUserBio)

export default router;

