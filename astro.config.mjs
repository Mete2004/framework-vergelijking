// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Elke pagina bij elk bezoek op de server bouwen, net als SvelteKit (zodat de server ?menu= kan lezen)
  output: 'server',
  // De Netlify-adapter zet de servercode om naar Netlify Functions
  adapter: netlify()
});
