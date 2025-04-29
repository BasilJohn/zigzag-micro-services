import { Router } from 'express'
import { uploadFile } from '../controllers/controller.media'

const router = Router()

router.post('/upload-media', uploadFile)

export default router