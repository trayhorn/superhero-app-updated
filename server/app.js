import express from "express";
import "dotenv/config";
import cors from 'cors';
import morgan from 'morgan';
import multer from "multer";
import path from "path";
import { ctrl } from "./controllers/controllers.js";
import { superHeroSchema } from "./model/HeroModel.js";
import validateBody from "./helpers/validateSchema.js";

const app = express();

const uploadDir = path.join(process.cwd(), "temp");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/superhero", ctrl.getAllHeroes);

app.get("/superhero/:id", ctrl.getHeroById);

app.post("/superhero/create", upload.array("images"), validateBody(superHeroSchema), ctrl.addHero);

app.delete("/superhero/:id", ctrl.deleteHero);

app.put("/superhero/:id", upload.array("newImages"), ctrl.editHero);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

export { app };