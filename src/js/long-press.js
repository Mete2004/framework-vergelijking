// Enhancement: menu openen met lang indrukken (telefoon), net als in SnappThis (groups/+page.svelte).
// Zonder JavaScript werkt het menu nog steeds via het pijltje.

const list = document.querySelector('.groups');

// JavaScript werkt: het pijltje mag op mobiel verborgen worden (zie CSS .enhanced)
list.classList.add('enhanced');

let timer; // de timer van lang indrukken, zodat we hem kunnen stoppen
let isTouching = false; // staat er nu een vinger op het scherm?
let longPressed = false; // is er lang ingedrukt? Dan de klik daarna tegenhouden

// Menu openen of sluiten via dezelfde URL als het pijltje.
// Alleen in 11ty: geen goto() zoals in SvelteKit, maar een gewone navigatie naar een nieuwe pagina.
// De #slug zorgt dat je bij deze groep uitkomt (in SvelteKit doet noScroll dat).
function toggleMenu(row) {
	const slug = row.dataset.slug;
	const isOpen = row.querySelector('.menu-link.open'); // staat het menu van deze groep al open?
	location.href = isOpen ? `/groups/#${slug}` : `/groups/menu/${slug}/#${slug}`;
}

for (const row of list.querySelectorAll('.group-list-container')) {
	// Vinger op de rij: start een timer. Nodig voor iOS, want Safari stuurt geen contextmenu-event.
	row.addEventListener('pointerdown', (event) => {
		longPressed = false; // nieuwe druk, dus opnieuw beginnen
		if (event.pointerType !== 'touch') return; // muis? Dan niets doen

		isTouching = true;
		timer = setTimeout(() => {
			longPressed = true; // 500 ms vastgehouden: dit is lang indrukken
			toggleMenu(row);
		}, 500);
	});

	// Losgelaten, van de rij af geschoven of gaan scrollen voor de 500 ms
	for (const type of ['pointerup', 'pointerleave', 'pointercancel']) {
		row.addEventListener(type, () => {
			isTouching = false;
			clearTimeout(timer); // timer stoppen, dus het menu gaat niet open
		});
	}

	// Opent het menu bij lang indrukken op Android. Een rechtsklik op desktop opent het normale browsermenu.
	row.addEventListener('contextmenu', (event) => {
		// Muis of toetsenbord: het gewone menu van de browser tonen.
		// Alleen in 11ty: ook de pointerType van het event zelf checken, want soms komt er geen pointerdown vóór het contextmenu
		if (!isTouching && event.pointerType !== 'touch') return;

		event.preventDefault(); // het menu van de telefoon niet tonen
		if (longPressed) return; // de timer heeft het menu al geopend

		clearTimeout(timer);
		longPressed = true; // de klik na het loslaten tegenhouden
		toggleMenu(row);
	});

	// Na lang indrukken niet alsnog naar de groepspagina gaan (de groepsnaam is een link)
	row.addEventListener(
		'click',
		(event) => {
			if (longPressed) {
				event.preventDefault();
				longPressed = false;
			}
		},
		true // capture, net als onclickcapture in SnappThis
	);
}
