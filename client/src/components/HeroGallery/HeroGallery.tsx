import HeroCard from "../HeroCard/HeroCard";
import type { superHero } from "../../types/types";
import styles from "./HeroGallery.module.css";

type HeroGallery = {
	heroes: superHero[];
	onDelete: (id: string) => void;
};

export default function HeroGallery({ heroes, onDelete }: HeroGallery) {
	return (
		<ul className={styles.heroGallery}>
			{heroes.map((hero) => (
				<HeroCard key={hero._id} heroData={hero} onDelete={onDelete} />
			))}
		</ul>
	);
}