import { createApp } from "./app.js";

import { DataModel, LoginModel,  UserModel } from "./models/mysql/product.js";

createApp({ userModel: UserModel, loginModel: LoginModel, dataModel:DataModel})