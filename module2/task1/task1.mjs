import fs from "fs";
import sharp from "sharp";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config();

const {
  imageWidth,
  imageHeight,
  logoPath,
  watermarkOpacity,
  textOpacity,
  text1Color,
  text2Color,
  fontSizeLarge,
  fontSizeSmall,
  title,
  webAddress,
} = process.env;

const originalImagePath = "./image.jpg";
const outputImagePath = "./new-image.png";

async function processImage() {
  const imageBuffer = fs.readFileSync(originalImagePath);
  const logoBuffer = fs.readFileSync(logoPath);

  const image = sharp(imageBuffer)
    .resize(Number(imageWidth), Number(imageHeight))
    .composite([
      {
        input: logoBuffer,
        gravity: "southeast",
        blend: "over",
        top:210,
        left:205,
        opacity: Number(watermarkOpacity),
      },
      {
        input: Buffer.from(
          `<svg width="${imageWidth}" height="${imageHeight}">
                        <text x="20" y="${
                          imageHeight - 25
                        }" font-size="${fontSizeLarge}px" fill="${text1Color}" opacity="${textOpacity}">${title}</text>
                        <text x="10" y="${
                          imageHeight - 10
                        }" font-size="${fontSizeSmall}px" fill="${text2Color}" opacity="${textOpacity}">${webAddress}</text>
                    </svg>`
        ),
        gravity: "southwest",
        blend: "over",
      },
    ])
    .png();

  await image.toFile(outputImagePath);
  console.log(`Image saved to ${outputImagePath}`);
}

processImage().catch((err) => {
  console.error("Failed to process image:", err);
});
