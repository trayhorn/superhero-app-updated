import styles from './Header.module.css';
import { Outlet } from 'react-router-dom';

export default function Header() {
	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.header_title}>Superheroes</h1>
			</header>
			<Outlet />
		</>
	);
}