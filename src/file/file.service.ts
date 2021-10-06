import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
    IMAGE = 'image'
}

export enum FileDescription {
    AVATAR = 'avatar',
    POST = 'post'
}

@Injectable()
export class FileService {
    saveFiles(type: FileType, description: FileDescription, files, username): string[] {
        const filePaths = []
        files.forEach((file) => {
            try {
                const fileExtension = file.originalname.split('.').pop();
                const fileName = uuid.v4() + '.' + fileExtension;
                const filePath = path.resolve(__dirname, '..', 'static', type, description, username);
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true});
                }
                fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
                filePaths.push(type + '/' + description + '/' + username + '/' + fileName);
            } catch (e) {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
        return filePaths;
    }

    removeFile(destinations: string[]): boolean {
        let result: boolean = false;
        try {
            destinations.forEach((filePath) => {
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', filePath));
                const dirPath = filePath.split('/');
                dirPath.length = dirPath.length - 1;
                this.removeDirectories(dirPath.join('/'));
            });
            result = true;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    removeDirectories(dirPath) {
        fs.readdir(dirPath, (err, files) => {
            try {
                if (files === undefined) {
                    fs.rmdirSync(path.resolve(__dirname, '..', 'static', dirPath));
                }
            } catch (err) {}
        });
    }
}
