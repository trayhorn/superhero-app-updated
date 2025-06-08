import styles from './CreateHeroBtn.module.css';

type CreateHeroBtnProps = {
  openModal: () => void;
}

export default function CreateHeroBtn({openModal}: CreateHeroBtnProps) {
  return (
		<div>
			<button className={styles.createHeroBtn} onClick={openModal}>
				Create hero
			</button>
		</div>
	);
}