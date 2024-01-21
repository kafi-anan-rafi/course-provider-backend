"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const admin_1 = require("./routes/admin");
const user_1 = require("./routes/user");
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/admin", admin_1.router);
app.use("/user", user_1.router);
app.get("/", (req, res) => {
    res.json({ msg: "Hello World!" });
});
app.post("/", (req, res) => {
    const body = req.body;
    res.send(body);
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}...`);
});
if (process.env.DB_URL && process.env.DB_NAME) {
    mongoose_1.default.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });
}
else {
    console.error("DB_URL or DB_NAME environment variables are not defined.");
}
