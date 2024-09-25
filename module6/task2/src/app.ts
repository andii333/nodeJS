import express from "express";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import archiver from "archiver";
import { Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Отримуємо кількість продуктів і розмір QR-коду з оточення
const PRODUCT_AMOUNT = parseInt(process.env.PRODUCT_AMOUNT || "100", 10);
const QR_CODE_SIZE = parseInt(process.env.QR_CODE_SIZE || "500", 10);

// Хелпер для генерації QR-коду у форматі PNG
const generateQRCode = async (id: string): Promise<Buffer> => {
 return await QRCode.toBuffer(id, { scale: QR_CODE_SIZE / 100 });
};

// Хелпер для створення ZIP-архіву і стріму його у відповідь
const streamZipWithQRCodes = async (res: Response, productAmount: number) => {
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(res);

  for (let i = 1; i <= productAmount; i++) {
    const productId = uuidv4();
    const qrCode = await generateQRCode(productId);

    // Назва файлу з індексом продукту
    archive.append(qrCode, { name: `${i}.png` });
  }

  // Завершуємо створення архіву
  archive.finalize();
};

// Обробник запиту на отримання QR-кодів
app.get("/products/qrcodes", async (req, res) => {
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", 'attachment; filename="qrcodes.zip"');

  // Стрім ZIP-файлів з QR-кодами
  await streamZipWithQRCodes(res, PRODUCT_AMOUNT);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
