// Groepen uit Directus. 11ty haalt ze één keer op, tijdens de build.
// De naam van dit bestand (groups) is de naam van de data in de templates.
const directusUrl = 'https://fdnd-agency.directus.app';

export default async function () {
	const response = await fetch(
		// specifieke velden ophalen
		`${directusUrl}/items/snappthis_group?fields=uuid,slug,name,users`
	);

	const { data: groups } = await response.json();

	// Per groep de snappmaps ophalen (zelfde query als SnappThis), voor de detailpagina.
	// Promise.all: alle fetches tegelijk, in plaats van na elkaar.
	await Promise.all(
		groups.map(async (group) => {
			const snappmapsResponse = await fetch(
				`${directusUrl}/items/snappthis_snapmap?filter[groups][snappthis_group_uuid][_eq]=${group.uuid}&fields=uuid,slug,name,time_start,time_end`
			);

			const { data: snappmaps } = await snappmapsResponse.json();
			group.snappmaps = snappmaps;
		})
	);

	// Directus heeft geen aanmaakdatum voor groepen. Elk nieuw lid krijgt een oplopend id,
	// dus de groep met het hoogste id in users is het nieuwst toegevoegd.
	return groups.sort((a, b) => Math.max(...b.users) - Math.max(...a.users));
}
