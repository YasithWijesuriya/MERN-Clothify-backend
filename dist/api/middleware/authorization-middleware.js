"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isAdmin = void 0;
const express_1 = require("@clerk/express");
// Custom ForbiddenError message
class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.name = "ForbiddenError";
    }
}
const isAdmin = (req, res, next) => {
    const auth = (0, express_1.getAuth)(req);
    const metadata = auth.sessionClaims?.metadata;
    const userRole = metadata?.role;
    if (!userRole || userRole !== "admin") {
        return res.status(403).json({ message: new ForbiddenError().message });
    }
    console.log("User authenticated:", auth.userId);
    console.log("User role:", userRole);
    next();
};
exports.isAdmin = isAdmin;
const isAuthenticated = (req, res, next) => {
    try {
        const auth = (0, express_1.getAuth)(req);
        if (!auth || !auth.userId) {
            return res.status(401).json({
                status: "error",
                message: "Authentication required",
            });
        }
        req.auth = auth;
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
//# sourceMappingURL=authorization-middleware.js.map