import { Schema, model } from "mongoose";
import Joi from "joi";

const heroSchema = new Schema(
	{
		nickname: {
			type: String,
			required: true,
		},
		real_name: {
			type: String,
			required: true,
		},
		origin_description: {
			type: String,
			required: true,
		},
		superpowers: {
			type: String,
			required: true,
		},
		catch_phrase: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			default: [],
		}
	},
	{ versionKey: false, timestamps: false }
);

const superHeroSchema = Joi.object({
	nickname: Joi.string().required(),
	real_name: Joi.string().required(),
	origin_description: Joi.string().required(),
	superpowers: Joi.string().required(),
	catch_phrase: Joi.string().required(),
	images: Joi.array().items(Joi.string()).default([]),
})

const Superhero = model("superhero", heroSchema, "superheroes");

export { Superhero, superHeroSchema };