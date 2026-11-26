// Groepsmenu uit SnappThis (organisms/GroupManagementMenu.svelte).
// Net als in 11ty alleen open en dicht: de knoppen versturen niets (geen form, type="button").
import styles from './GroupManagementMenu.module.css';

export default function GroupManagementMenu() {
	return (
		<div className={styles['group-menu']}>
			<div className={styles.options}>
				<button type="button" className={styles.option}>
					<svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
						<path d="M14 4h5v16h-5M3 12h11M7 8l-4 4 4 4" />
					</svg>
					Leave this group
				</button>

				<button type="button" className={styles.option}>
					<svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
						<path d="M5 5l14 14M19 5L5 19" />
					</svg>
					Delete this group
				</button>
			</div>
		</div>
	);
}
