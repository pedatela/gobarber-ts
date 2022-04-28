import { container } from "tsyringe";

import IStorageProvider from "./StorageProviders/model/IStorageProvider";
import DiskStorageProvider from "./StorageProviders/implementations/DiskStorageProvider";

// import IMailProvider from "./MailProvider/model/IMailProvider";
// import MailProvider from "./MailProvider/implementations";

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider)
// container.registerSingleton<IMailProvider>('MailProvider', MailProvider)