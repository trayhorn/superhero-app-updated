import { Superhero } from "../model/HeroModel.js";
import HttpError from "../helpers/HttpError.js";
import fs from "fs/promises";
import path from "path";

const dirname = import.meta.dirname;

const SuperheroService = {
	getAllHeroes: async (skip, limit) => {
		return await Promise.all([
			Superhero.find({}, "_id nickname images", {
				skip,
				limit: Number(limit),
			}).sort({ createdAt: -1 }),
			Superhero.countDocuments(),
		]);
	},
	getHeroById: async (id) => {
		const hero = await Superhero.findById(id);
		if (!hero) throw HttpError(400, "No such hero");
		return hero;
	},
	addHero: async (files, body) => {
		const { nickname: newHeroNickname } = body;

		const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

		const duplicateHero = await Superhero.findOne({
			nickname: { $regex: `^${escapeRegex(newHeroNickname)}$`, $options: "i" },
		});
		if (duplicateHero)
			throw HttpError(400, "The hero with this nickname already exists");

		const newHero = await Superhero.create({ ...body, images: [] });

		if (files.length > 0) {
			const heroDirName = newHero._id.toString();
			const imagesSaveDir = path.join(
				dirname,
				"../",
				"public",
				"images",
				heroDirName
			);

			await fs.mkdir(imagesSaveDir, { recursive: true });
			const imagesArray = [];

			await Promise.all(
				files.map(async (file) => {
					const { originalname, path: oldPath } = file;

					const imageUrl = path.join("images", heroDirName, originalname);
					imagesArray.push(imageUrl);

					await fs.rename(oldPath, path.join(imagesSaveDir, originalname));
				})
			);

			newHero.images = imagesArray;
			await newHero.save();
		}

		return newHero;
	},
	deleteHero: async (id) => {
		const result = await Superhero.findByIdAndDelete(id);

		if (!result) throw HttpError(400, "No such superhero");

		const imagesFolderPath = path.join(dirname, "..", "public", "images", id);
		await fs.rm(imagesFolderPath, { recursive: true, force: true });
	},
	editHero: async (id, body, newFiles) => {
		const heroToEdit = await Superhero.findById(id);

		if (!heroToEdit) {
			throw HttpError(400, "No such superhero");
		}

		let existingImages = [];
		if (body.images) {
			try {
				existingImages = JSON.parse(body.images);
			} catch {
				existingImages = [];
			}
		}

		const { images: allHeroImages } = heroToEdit;
		const imagesToKeep = existingImages;

		const imagesToDelete = allHeroImages.filter(
			(img) => !imagesToKeep.includes(img)
		);

		await Promise.all(
			imagesToDelete.map(async (imgPath) => {
				const fullPath = path.join(dirname, "../", "public", imgPath);
				try {
					await fs.unlink(fullPath);
				} catch (error) {
					console.log(error.message);
				}
			})
		);

		const newImages = [];

		if (newFiles) {
			const heroDirName = heroToEdit._id.toString();
			const imagesSaveDir = path.join(
				dirname,
				"../",
				"public",
				"images",
				heroDirName
			);

			await Promise.all(
				newFiles.map(async (file) => {
					const { originalname, path: oldPath } = file;

					const imageUrl = path.join("images", heroDirName, originalname);
					newImages.push(imageUrl);

					await fs.rename(oldPath, path.join(imagesSaveDir, originalname));
				})
			);
		}

		const updatedHero = await Superhero.findByIdAndUpdate(
			id,
			{
				...body,
				images: [...existingImages, ...newImages],
			},
			{ returnDocument: "after" }
    );

    return updatedHero;
	},
};

export default SuperheroService;