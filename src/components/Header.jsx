// Header uit SnappThis (organisms/Header.svelte). De pagina geeft de props mee.
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header({ title = '', showBackButton = false, backUrl = '/' }) {
	return (
		<header className={styles['top-nav']}>
			{showBackButton && (
				// Back navigation. <Link> in plaats van <a>, zodat Next.js wisselt zonder te herladen (zoals SvelteKit)
				<Link href={backUrl} className={styles['go-back-link']} aria-label="Go back">
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<title>Go back</title>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M7.6 14L18.8 2.8L16 0L0 16L16 32L18.8 29.2L7.6 18H32V14H7.6Z"
						/>
					</svg>
				</Link>
			)}

			<h1 className={styles.title}>{title}</h1>
		</header>
	);
}
