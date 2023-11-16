import { createApp } from "./app.js";

import { ProductModel,UserModel } from "./models/local-file-system/product.js";

createApp({ productModel: ProductModel, userModel: UserModel })