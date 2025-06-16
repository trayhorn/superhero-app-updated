type CreateHeroBtnProps = {
  openModal: () => void;
}

export default function CreateHeroBtn({openModal}: CreateHeroBtnProps) {
  return (
		<div>
			<button className="homePageButton" onClick={openModal}>
				Create hero
			</button>
		</div>
	);
}