// Basis van elke pagina, net als app.html + +layout.svelte in SnappThis.
// De viewport-meta zet Next.js er zelf in.
import '../global.css';
import '../styleguide.css';

// Zelfde extra meta als in app.html van SnappThis
export const metadata = {
	other: { 'text-scale': 'scale' },
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
