export default interface IStorageProvider{
    saveFile(file: string): Promise<String>;
    deleteFile(file: string):Promise<void>;
}