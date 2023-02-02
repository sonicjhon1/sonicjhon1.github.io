// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define a schema for each collection you'd like to validate.
const xicmiaCollection = defineCollection({
	schema: z.object({
        judul: z.string(),
        tanggalKasih: z.string().transform(str => new Date(str)),
        tanggalKumpul: z.string().transform(str => new Date(str)),
        mataPelajaran: z.enum([
                "#KIMIA", "#FISIKA", "#BIO", "#MATEMINAT", // Minat di MIA
                "#MATEWAJIB", "#SEJARAHWAJIB", // Wajib di MIA
                "#BINDO", "#ENG", "#MAND", // Bahasa
                "#SBK", "#AGAMA", "#PPKN", "#TIK", "#PJOK" // Lainnya
        ]),
        dalam: z.string(),
	}),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	xicmia: xicmiaCollection,
};
