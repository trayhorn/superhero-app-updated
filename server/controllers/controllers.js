import ctrlWrapper from "../helpers/ctrlWrapper.js";
import SuperheroService from "../services/SuperheroService.js";

const getAllHeroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
	const skip = (page - 1) * limit;

	const [superheroes, total] = await SuperheroService.getAllHeroes(skip, limit);

	res.status(200).json({
		superheroes,
		totalPages: Math.ceil(total / limit),
	});
}

const getHeroById = async (req, res) => {
  const { id } = req.params;
	const hero = await SuperheroService.getHeroById(id);
  res.status(200).json(hero);
}

const addHero = async (req, res) => {
	const files = req.files;
	const newHero = await SuperheroService.addHero(files, req.body);
  res.status(201).json(newHero);
}

const deleteHero = async (req, res) => {
  const { id } = req.params;
	await SuperheroService.deleteHero(id);

	res.status(200).json({
		message: "success",
	});
}

const editHero = async (req, res) => {
	const { id } = req.params;
	const updatedHero = await SuperheroService.editHero(id, req.body, req.files);
	res.status(200).json(updatedHero);
};


export const ctrl = {
	getAllHeroes: ctrlWrapper(getAllHeroes),
	getHeroById: ctrlWrapper(getHeroById),
	deleteHero: ctrlWrapper(deleteHero),
	addHero: ctrlWrapper(addHero),
	editHero: ctrlWrapper(editHero),
};