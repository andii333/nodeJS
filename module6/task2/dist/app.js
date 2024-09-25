"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrcode_1 = __importDefault(require("qrcode"));
const uuid_1 = require("uuid");
const archiver_1 = __importDefault(require("archiver"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Отримуємо кількість продуктів і розмір QR-коду з оточення
const PRODUCT_AMOUNT = parseInt(process.env.PRODUCT_AMOUNT || "100", 10);
const QR_CODE_SIZE = parseInt(process.env.QR_CODE_SIZE || "500", 10);
// Хелпер для генерації QR-коду у форматі PNG
const generateQRCode = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield qrcode_1.default.toBuffer(id, { scale: QR_CODE_SIZE / 100 });
});
// Хелпер для створення ZIP-архіву і стріму його у відповідь
const streamZipWithQRCodes = (res, productAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const archive = (0, archiver_1.default)("zip", { zlib: { level: 9 } });
    archive.pipe(res);
    for (let i = 1; i <= productAmount; i++) {
        const productId = (0, uuid_1.v4)();
        const qrCode = yield generateQRCode(productId);
        // Назва файлу з індексом продукту
        archive.append(qrCode, { name: `${i}.png` });
    }
    // Завершуємо створення архіву
    archive.finalize();
});
// Обробник запиту на отримання QR-кодів
app.get("/products/qrcodes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="qrcodes.zip"');
    // Стрім ZIP-файлів з QR-кодами
    yield streamZipWithQRCodes(res, PRODUCT_AMOUNT);
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
