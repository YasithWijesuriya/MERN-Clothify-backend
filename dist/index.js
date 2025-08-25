"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const index_1 = require("./infrastructure/db/index");
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./api/product"));
const categories_1 = __importDefault(require("./api/categories"));
const review_1 = __importDefault(require("./api/review"));
const order_1 = __importDefault(require("./api/order"));
const color_1 = __importDefault(require("./api/color"));
const gallery_1 = __importDefault(require("./api/gallery"));
const global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server / Postman requests
      if (FRONTEND_URL && origin === FRONTEND_URL) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express_1.default.json());
// Clerk middleware setup - apply to all routes
app.use((0, express_2.clerkMiddleware)());
app.use("/api/products", product_1.default);
app.use("/api/categories", categories_1.default);
app.use("/api/reviews", review_1.default);
app.use("/api/orders", order_1.default);
app.use("/api/colors", color_1.default);
app.use("/api/gallery", gallery_1.default);
app.use(global_error_handling_middleware_1.default);
(0, index_1.connectDB)();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map