import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default{
    tempFolder: tempFolder,
    uploadsFolder: uploadsFolder,
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName)
        }
    })
}