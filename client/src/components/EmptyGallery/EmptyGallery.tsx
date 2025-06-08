import styles from './EmptyGallery.module.css';

export default function EmptyGallery() {
  return (
		<div className={styles.emptyGallery}>
			<h2 className={styles.emptyGallery__title}>No Heroes Found</h2>
			<p className={styles.emptyGallery__message}>
				Start by adding your favorite superheroes!
			</p>
		</div>
	);
}