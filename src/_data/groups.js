// Groepen uit Directus. 11ty haalt ze één keer op, tijdens de build.
// De naam van dit bestand (groups) is de naam van de data in de templates.
const directusUrl = 'https://fdnd-agency.directus.app';

export default async function () {
	const response = await fetch(
		// specifieke velden ophalen
		`${directusUrl}/items/snappthis_group?fields=uuid,slug,name,users`
	);

	const { data: groups } = await response.json();

	// Directus heeft geen aanmaakdatum voor groepen. Elk nieuw lid krijgt een oplopend id,
	// dus de groep met het hoogste id in users is het nieuwst toegevoegd.
	return groups.sort((a, b) => Math.max(...b.users) - Math.max(...a.users));
}
