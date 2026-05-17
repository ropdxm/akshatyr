/**
 * One-shot photo optimizer.
 * Reads source photos from the user's Downloads folder, resizes the
 * long edge to MAX_DIM, encodes as JPEG (quality 82) and writes
 * sequentially-named files to public/photos/.
 *
 * Sharp handles the regular JPEGs; heic-convert handles HEIC because
 * sharp's bundled libvips on Windows lacks the HEVC decoder.
 */
import sharp from "sharp";
import heicConvert from "heic-convert";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SOURCES = [
  "C:/Users/ropdx/Downloads/IMG_2958.JPG.jpeg",
  "C:/Users/ropdx/Downloads/IMG_2959.JPG.jpeg",
  "C:/Users/ropdx/Downloads/IMG_2961.JPG.jpeg",
  "C:/Users/ropdx/Downloads/IMG_2962.JPG.jpeg",
  "C:/Users/ropdx/Downloads/IMG_2967.JPG.jpeg",
  "C:/Users/ropdx/Downloads/IMG_2067.HEIC",
];

const OUT_DIR = path.resolve("public/photos");
const MAX_DIM = 1800;
const QUALITY = 82;

await mkdir(OUT_DIR, { recursive: true });

let i = 1;
for (const src of SOURCES) {
  const out = path.join(OUT_DIR, `photo-${i}.jpg`);

  // Decode HEIC to an intermediate JPEG buffer first if needed.
  let inputBuffer;
  if (/\.heic$/i.test(src)) {
    const inputData = await readFile(src);
    inputBuffer = Buffer.from(
      await heicConvert({ buffer: inputData, format: "JPEG", quality: 0.95 })
    );
  } else {
    inputBuffer = await readFile(src);
  }

  await sharp(inputBuffer)
    .rotate() // honour EXIF orientation, then strip the tag
    .resize({
      width: MAX_DIM,
      height: MAX_DIM,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out);

  const meta = await sharp(out).metadata();
  const size = (await stat(out)).size;
  console.log(
    `photo-${i}.jpg  ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)} KB`
  );
  i++;
}

console.log(`\nDone. Wrote ${SOURCES.length} files to ${OUT_DIR}`);
