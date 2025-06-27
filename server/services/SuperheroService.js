import { Superhero } from "../model/HeroModel.js";
import HttpError from "../helpers/HttpError.js";
import fs from "fs/promises";
import {
	uploadFilesIntoBucket,
	deleteFilesFromBucket,
	deleteFilesOnEdit,
	getImageSignedUrl,
} from "../aws-s3.js";

const SuperheroService = {
	getAllHeroes: async (skip, limit) => {
		const superheroes = await Superhero.find({}, "_id nickname images", {
			skip,
			limit: Number(limit),
		}).lean();

		await Promise.all(
			superheroes.map(async (hero) => {
				const key = hero.images[0];
				if (hero.images.length > 0 && hero.images[0]) {
					const url = await getImageSignedUrl(key);
					hero.thumbnail = url;
				}
			})
		);

		const total = await Superhero.countDocuments();

		return [superheroes, total];
	},
	getHeroById: async (id) => {
		const superhero = await Superhero.findById(id).lean();
		if (!superhero) throw HttpError(400, "No such hero");

		let imageUrls = [];

		if (superhero.images.length > 0) {
			imageUrls = await Promise.all(
				superhero.images.map((image) => getImageSignedUrl(image))
			);
		}

		superhero.urls = imageUrls;

		return superhero;
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
			const imagesArray = [];

			await Promise.all(
				files.map(async (file) => {
					const { originalname, path: oldPath } = file;

					const key = `${heroDirName}/${originalname}`;

					try {
						await uploadFilesIntoBucket({
							key,
							filePath: oldPath,
						});
					} catch (error) {
						console.log("Error when uploading files to bucket", error);
					}
					imagesArray.push(key);
					await fs.unlink(oldPath);
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

		await deleteFilesFromBucket(id);
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


		if(imagesToDelete.length > 0) await deleteFilesOnEdit(imagesToDelete);

		const newImages = [];

		if (newFiles) {
			const heroDirName = heroToEdit._id.toString();

			await Promise.all(
				newFiles.map(async (file) => {
					const { originalname, path: oldPath } = file;
					const key = `${heroDirName}/${originalname}`;

					await uploadFilesIntoBucket({
						key,
						filePath: oldPath,
					});
					newImages.push(key);
					fs.unlink(oldPath);
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