import express from 'express'
import { login, signup, deleteUser } from '../controllers/controller.user'
import { createUserBio, updateUserBio, getUserBio } from '../controllers/controller.userbio'
import { authenticateAccessToken } from '../middleware/authMiddleware'

const router = express.Router()

//User
router.post('/login', login)
router.post('/signup', signup)

//✅ Apply authentication middleware to all routes below this line
router.use(authenticateAccessToken)


router.delete('/:id', deleteUser)

//User Bio
router.post('/:id/bio', createUserBio)
router.patch('/:id/bio', updateUserBio)
router.get('/:id/bio', getUserBio)



export default router;