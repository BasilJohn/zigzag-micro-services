import { Router } from 'express'
import { uploadFile, uploadMultipleFiles } from '../controllers/controller.media'

const router = Router()

router.post('/upload-media', uploadFile)
router.post('/upload-media-multiple', uploadMultipleFiles)


export default router