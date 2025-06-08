import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
	return (
		<div className={styles.notFoundPage}>
			<h1 className={styles.error}>404</h1>
			<h2>Page Not Found</h2>
			<Link className={styles.link} to="/superheroes">
				Back to homepage
			</Link>
		</div>
	);
}