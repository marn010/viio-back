import { createApp } from "./app.js";

import { ProductModel, UserModel } from "./models/mysql/product.js";

createApp({ productModel: ProductModel, userModel: UserModel })