"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const express_1 = require("@clerk/express");
const isAuthenticated = (req, res, next) => {
    try {
        const auth = (0, express_1.getAuth)(req);
        if (!auth || !auth.userId) {
            res.status(401).json({ status: "error", message: "Authentication required" });
            return; // Stop execution
        }
        req.auth = auth;
        next();
    }
    catch {
        res.status(401).json({ status: "error", message: "Invalid authentication token" });
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authentication-middleware.js.map