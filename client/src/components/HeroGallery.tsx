import HeroCard from "./HeroCard";
import type { superHero } from "../types/types";

type HeroGallery = {
	heroes: superHero[];
	onDelete: (id: string) => void;
};

export default function HeroGallery({ heroes, onDelete }: HeroGallery) {
	return (
		<ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5 bg-primary-light dark:bg-dark-primary-light p-md m-0 2xl:grid-cols-5">
			{heroes.map((hero) => (
				<HeroCard key={hero._id} heroData={hero} onDelete={onDelete} />
			))}
		</ul>
	);
}
