import { createApp } from "./app.js";

import { DataModel, LoginModel, ProductModel, UserModel } from "./models/mysql/product.js";

createApp({ productModel: ProductModel, userModel: UserModel, loginModel: LoginModel, dataModel:DataModel})