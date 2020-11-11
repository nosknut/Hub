"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 80;
app.use(cors_1.default());
app.use(express_1.default.json());
const uri = process.env.ATLAS_URI;
// tslint:disable-next-line:no-console
console.log(uri);
mongoose_1.default.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const { connection } = mongoose_1.default;
connection.once("open", () => {
    // tslint:disable-next-line:no-console
    console.log("MongoDB database connection established successfully");
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map