import sharp from "sharp";
import { cache } from "./imageCache";
const nullObj = {};

export async function optimizeImage(src: string, format: keyof sharp.FormatEnum, width: number, height: number): Promise<string> {
	const metadata = `${src}-${width}.${height}-${format}`;
	const map = cache.get(nullObj) ?? new Map<string, string>();

	// Check if the Base64 image is already cached for the current request
	const cachedImage = map.get(metadata);
	if (cachedImage) {
		return cachedImage;
	}

	// Generate the Base64 image using sharp and store it in the cache
	const buffer = await sharp(await (await fetch(decodeURIComponent(src))).arrayBuffer())
		.resize({
			width,
			height,
			fit: sharp.fit.cover,
		})
		.toFormat(format)
		.toBuffer();
	const base64 = `data:image/${format};base64,${buffer.toString("base64")}`;
	map.set(metadata, base64);
	cache.set(nullObj, map);
	return base64;
}
