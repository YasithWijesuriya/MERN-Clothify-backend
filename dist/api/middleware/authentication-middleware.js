"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const express_1 = require("@clerk/express");
const isAuthenticated = (req, res, next) => {
    try {
        const auth = (0, express_1.getAuth)(req);
        if (!auth || !auth.userId) {
            return res.status(401).json({
                status: "error",
                message: "Authentication required",
            });
        }
        // Store auth data in res.locals instead of req.auth
        res.locals.auth = auth;
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Invalid authentication token",
        });
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authentication-middleware.js.map