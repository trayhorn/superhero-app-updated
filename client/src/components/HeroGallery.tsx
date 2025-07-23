import HeroCard from "./HeroCard";
import type { superHero } from "../types/types";
import { Fragment } from "react/jsx-runtime";
import type { InfiniteData } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface SuperheroResponse {
	superheroes: superHero[];
	totalPages: number;
}

type SuperheroQueryData = InfiniteData<AxiosResponse<SuperheroResponse>>;

type HeroGalleryProps = {
	data: SuperheroQueryData;
	onDelete: () => void;
};

export default function HeroGallery({ data, onDelete }: HeroGalleryProps) {
	return (
		<ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5 bg-gallery-bg dark:bg-dark-gallery-bg p-md m-0 2xl:grid-cols-5">
			{data.pages.map((page, i) => (
				<Fragment key={i}>
					{page.data.superheroes.map((hero: superHero) => {
						return (
							<HeroCard key={hero._id} heroData={hero} onDelete={onDelete} />
						);
					})}
				</Fragment>
			))}
		</ul>
	);
}
