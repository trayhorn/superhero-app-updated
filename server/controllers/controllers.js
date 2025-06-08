import { Superhero } from "../model/HeroModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import path from "path";
import fs from "fs/promises";

const dirname = import.meta.dirname;

const getAllHeroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
	const skip = (page - 1) * limit;

  const [superheroes, total] = await Promise.all([
		Superhero.find({}, "_id nickname images", { skip, limit: Number(limit) }),
		Superhero.countDocuments(),
	]);

	res.status(200).json({
		superheroes,
		totalPages: Math.ceil(total / limit),
	});
}

const getHeroById = async (req, res) => {
  const { id } = req.params;
  const hero = await Superhero.findById(id);
  if (!hero) throw HttpError(400, "No such hero");
  res.status(200).json(hero);
}

const addHero = async (req, res) => {
	const files = req.files;

	const newHero = await Superhero.create({ ...req.body, images: [] });
	const heroDirName = newHero._id.toString();

	const imagesSaveDir = path.join(dirname, "../", "public", "images", heroDirName);

	await fs.mkdir(imagesSaveDir, { recursive: true });
  const imagesArray = [];

  await Promise.all(
    files.map(async (file) => {
			const { originalname, path: oldPath } = file;

      const imageUrl = path.join("images", heroDirName , originalname);
      imagesArray.push(imageUrl);

      await fs.rename(oldPath, path.join(imagesSaveDir, originalname));
    })
	)
	
	newHero.images = imagesArray;
	await newHero.save();

  res.status(201).json(newHero);
}

const deleteHero = async (req, res) => {
  const { id } = req.params;

  const result = await Superhero.findByIdAndDelete(id);

	if (!result) throw HttpError(400, "No such superhero");

	const imagesFolderPath = path.join(dirname, "..", "public", "images", id);
	await fs.rm(imagesFolderPath, { recursive: true, force: true });

	res.status(200).json({
		message: "success",
	});
}

const editHero = async (req, res) => {
	const { id } = req.params;
	const heroToEdit = await Superhero.findById(id);

	if (!heroToEdit) {
		throw HttpError(400, "No such superhero");
	}

	let existingImages = [];
	if (req.body.images) {
		try {
			existingImages = JSON.parse(req.body.images);
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
				console.log( error.message);
			}
		})
	);

	const newFiles = req.files;
	const newImages = [];

	if (newFiles) {
		const heroDirName = heroToEdit._id.toString();
		const imagesSaveDir = path.join(dirname, "../", "public", "images", heroDirName);

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
			...req.body,
			images: [...existingImages, ...newImages],
		},
		{ returnDocument: "after" }
	);

	res.status(200).json(updatedHero);
};


export const ctrl = {
	getAllHeroes: ctrlWrapper(getAllHeroes),
	getHeroById: ctrlWrapper(getHeroById),
	deleteHero: ctrlWrapper(deleteHero),
	addHero: ctrlWrapper(addHero),
	editHero: ctrlWrapper(editHero),
};