"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        next();
        // const token = authHeader.split(" ")[1];
        // jwt.verify(token, SECRET, (err, user) => {
        //   if (err) {
        //     res.sendStatus(403);
        //   } else {
        //     next();
        //   }
        // });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
