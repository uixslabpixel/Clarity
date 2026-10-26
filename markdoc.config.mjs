// Custom Markdoc tags used in CMS article bodies (mirrors the `components`
// declared on the Keystatic markdoc field).
import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    quote: {
      render: component('./src/components/content/Quote.astro'),
      selfClosing: true,
      attributes: { quote: { type: String }, cite: { type: String } },
    },
    figure: {
      render: component('./src/components/content/Figure.astro'),
      selfClosing: true,
      attributes: { src: { type: String }, alt: { type: String }, caption: { type: String }, height: { type: Number }, width: { type: Number } },
    },
  },
});
