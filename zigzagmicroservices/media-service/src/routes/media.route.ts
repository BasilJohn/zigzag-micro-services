import { Router } from 'express'
import { uploadFile, uploadMultipleFiles, getPresignedUrl } from '../controllers/controller.media'

const router = Router()

router.post('/upload-media', uploadFile)
router.post('/upload-media-multiple', uploadMultipleFiles)
router.get('/file-url/:objectName', getPresignedUrl)


export default router