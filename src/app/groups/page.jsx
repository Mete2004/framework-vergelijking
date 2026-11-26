// Groepenoverzicht, uit groups/+page.server.js en groups/+page.svelte van SnappThis.
// Een server-component: de data wordt bij elk bezoek op de server opgehaald, net als load() in SvelteKit.
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GroupList from '@/components/GroupList';

const directusUrl = 'https://fdnd-agency.directus.app';

// Zelfde title en description als <svelte:head> in SnappThis
export const metadata = {
	title: 'Your groups | SnappThis',
	description: 'View and manage your SnappThis groups, and create new ones.',
};

export default async function GroupsPage({ searchParams }) {
	const response = await fetch(
		// specifieke velden ophalen
		`${directusUrl}/items/snappthis_group?fields=uuid,slug,name,users`
	);

	const { data: groups } = await response.json();

	// Directus heeft geen aanmaakdatum voor groepen. Elk nieuw lid krijgt een oplopend id,
	// dus de groep met het hoogste id in users is het nieuwst toegevoegd.
	groups.sort((a, b) => Math.max(...b.users) - Math.max(...a.users));

	// /groups?menu=natuurnomaden opent het menu van die groep (het pijltje linkt hiernaartoe).
	// In Next.js 16 is searchParams een Promise, dus eerst wachten met await.
	const { menu: openMenu = null } = await searchParams;

	return (
		<>
			<Header title="Your groups" showBackButton={true} />

			<main>
				<GroupList groups={groups} openMenu={openMenu} />
			</main>

			<Footer />
		</>
	);
}
