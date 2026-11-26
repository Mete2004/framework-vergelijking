// Groepsdetail met de snappmaps, uit groups/[slug]/+page.server.js en +page.svelte van SnappThis.
// Net als de bron: geen <title>, <main> of description op deze pagina.
// Alleen in Next.js: csr = false (geen JavaScript) bestaat niet, React laadt altijd mee.
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const directusUrl = 'https://fdnd-agency.directus.app';

export default async function GroupPage({ params }) {
	// De slug uit de URL. In Next.js 16 is params een Promise, dus eerst wachten met await.
	const { slug } = await params;

	// Get the selected group using the slug from the URL.
	const groupResponse = await fetch(
		`${directusUrl}/items/snappthis_group?filter[slug][_eq]=${slug}&fields=uuid,name`
	);

	const { data: groups } = await groupResponse.json();
	const group = groups[0];

	// Get the Snappmaps that are connected to this group's UUID.
	const snappmapsResponse = await fetch(
		`${directusUrl}/items/snappthis_snapmap?filter[groups][snappthis_group_uuid][_eq]=${group.uuid}&fields=uuid,slug,name,time_start,time_end`
	);

	const { data: snappmaps } = await snappmapsResponse.json();

	return (
		<>
			<Header title="Your snappmaps" showBackButton={true} backUrl="/groups" />

			<ul className="groups">
				{snappmaps.map((snapmap) => (
					<li key={snapmap.uuid} className="group-list-container">
						<div className="group-list-stats snappmap">
							<h2>
								<a href={`/snappmaps/${snapmap.slug}`}>{snapmap.name}</a>
							</h2>

							<p>
								{snapmap.time_start} - {snapmap.time_end}
							</p>
						</div>
					</li>
				))}
			</ul>

			<Footer />
		</>
	);
}
