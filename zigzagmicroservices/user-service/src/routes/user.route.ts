import express from 'express'
import { login, signup, deleteUser } from '../controllers/controller.user'
import { createUserBio, updateUserBio, getUserBio } from '../controllers/controller.userbio'


const router = express.Router()

//User
router.post('/login', login)
router.post('/signup', signup)
router.delete('/:id', deleteUser)

//User Bio
router.post('/:id/bio', createUserBio)
router.patch('/:id/bio', updateUserBio)
router.get('/:id/bio', getUserBio)



export default router;