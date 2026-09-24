# ByteFX landing page

Next.js App Router, React, JavaScript/JSX and Tailwind CSS v4.

## Run

```sh
npm install
npm run dev
npm run lint
npm run build
npm start
```

The current development preview uses http://localhost:3000. A fresh server normally uses port 3000.

## Design

The visual reference is [Global Prime](https://globalprime.com/): charcoal `#0f0f0f`, secondary surfaces `#141414` and `#1b1b1b`, lime `#ade512`, white headings, rounded cards and pill buttons. ByteFX retains its own branding and content. Figtree Variable is bundled locally as the available typeface.

`app/globals.css` defines the dark and light tokens. `app/styles/base.css` contains resets, `components.css` contains shared component styles, and `reference-theme.css` applies this design. Component styles use the components cascade layer, so Tailwind utilities retain precedence.

Dark is the default. The header toggle remembers an explicit light/dark preference in localStorage before first paint. The original full-colour ByteFX logo is used without filters in both the header and footer.

## Page structure

1. Full-width sticky header with desktop mega menus and a mobile drawer.
2. Full-height hero carousel with four slides: Mindset, Stay cool (the trading cat), Global markets and Precious metals. Artwork lives in `public/assets/hero/`; copy, layout and focal points in `hero` inside `lib/content.js`.
3. **Trade with a global broker:** eight cards in a draggable carousel. The three added cards cover account choice, demo practice and mobile access. The cards are read-only stats, so they carry no per-card link button.
4. Bento: a commodities card with the market line-up artwork (Shares, Forex, Commodities, Crypto, Indices, oil, gold, silver, Bitcoin, Ether); an accounts card ("Trade on your terms") with a trader in a navy suit; the Partners Grow referral card; the partnership card.
5. Centered platform section with a new front-facing laptop, tablet and phone image; glass MetaTrader 5 and TradingView capsules with official standalone app icons and a single changing description. ByteFX does not offer MetaTrader 4.
6. Mobile section — deep-green-to-lime in dark mode, the original blue in light mode — matching the supplied reference: original hand-held ByteFX artwork on desktop, a separate upright screenshot phone below 981px, real Google Play QR, an App Store badge awaiting its URL, and the user-supplied 4.9/5 rating.
7. Payment section ("Fund your account your way.") with the full-colour wallet illustration beside seven expandable payment methods. Original-color Visa, Mastercard, Apple Pay, Bitcoin, USDT, bank wire and UPI logos accompany individual descriptions.
8. Testimonials as a continuously auto-scrolling wall of ten reviews.
9. **Ready to start trading?** with a minimum height of `100svh`, a lime glass scene inspired by the supplied background: arcs on the left and market tiles on the right. The two sides move toward one another as the section scrolls through the viewport. Reduced-motion preferences disable this effect. Up to 980px the artwork sits beneath the content, with its two halves side by side at their real proportions; content can grow for accessibility.
10. Footer with a new lime glass Bitcoin sculpture based on the supplied footer image.

## Artwork

Original PNG images were generated using the built-in image_gen tool and saved in `public/assets/generated/`. Object illustrations use alpha transparency and soft reflections; the platform wallpaper is an opaque charcoal, glass and lime composition. Next Image serves optimized image formats. Earlier artwork remains available in its original folders.

The initial prompts, filenames, palette and generation mode are recorded in [prompts.json](public/assets/generated/prompts.json). The four revised images and their exact prompts are recorded in [revision-prompts.json](public/assets/generated/revision-prompts.json).

The precious-metals hero uses newly generated gold and silver bullion with a flowing gold ribbon on charcoal. Its original is `public/assets/hero/hero-precious-metals.png`; the served WebP is 1659 × 948 and approximately 197 KB. The exact built-in image_gen prompt is saved in [precious-metals-prompt.json](public/assets/hero/precious-metals-prompt.json).

## Content and destinations

The eight broker cards use a custom charcoal, blackened titanium and smoked-glass sculpture series in `public/assets/broker/sculptures/`. Each keeps lime accents, transparent edges and a fading mirrored reflection, with new forms for leverage, spreads, instruments, execution, support, account choice, demo practice and device access. Original PNGs and 768 px WebPs are saved together; the exact built-in image_gen prompts are in [sculptures/prompts.json](public/assets/broker/sculptures/prompts.json).

Copy and destinations live in `lib/content.js`. Destination URLs that have not been supplied remain `href: null`; `SmartLink` renders those as non-interactive labels. Account registration, demo, platform downloads, social profiles and other destination pages still need their approved URLs.

The navbar and mobile-section QR codes encode `https://play.google.com/store/apps/details?id=com.bytefx.app&hl=en_IN`. The real code at `public/app-qr.png` was generated with the QRCode library and independently decoded from both rendered locations.

Current platform artwork: `public/assets/generated/platform-devices-front.png`. The earlier mobile stage is retained as an unused asset. Their exact prompts and built-in generation mode are in [showcase-prompts.json](public/assets/generated/showcase-prompts.json). Screenshots are displayed intact inside CSS phone frames. Platform and payment logo sources are recorded in their asset folders. Original solid interface glyphs in `components/icon.jsx` replace the previous outline style; no Lucide dependency is used.

## Atlas assistant

`components/atlas-chat.jsx` provides a bottom-right chat window with message submission, suggested questions, links, restart and Escape handling. `lib/atlas.js` supplies local website guidance for app downloads, platforms, markets and support. No live AI backend, account access or live market data is configured. Messages are kept only in component memory and are not transmitted to a service.

## Interactions

- Header is a full-width frosted bar pinned to the top edge; its contents follow the page's content width. It is visible at the top of the page (including over the hero) and tucks away on downward scroll. Scroll travel is accumulated per direction: 18 pixels down hides it, and it only returns after 64 pixels of deliberate upward scroll, so it no longer flies in and out while reading. It stays put whenever it is in use — pointer over the bar, a mega menu open, or the mobile drawer up — and reaching the top of the page always brings it back. A mobile drawer and visible keyboard focus keep it accessible.
- Mega menus wait 120 ms before opening on hover, so crossing the nav on the way down the page no longer throws a panel over the content; once one panel is open, moving between them is instant. Click, Escape and the mobile drawer are unchanged.
- Opening the mobile drawer locks the body scroll and compensates for the removed scrollbar, so the page no longer shifts sideways.
- Hero slides advance automatically every 8 seconds (`hero.interval` in `lib/content.js`); the active tab shows progress. There is no pause button. The slideshow only holds while someone is using it — hovering the tabs/arrows, keyboard focus inside it, or mid-swipe — and while it is off screen or the browser tab is hidden. Slides can also be swiped (touch, trackpad or mouse), changed with the arrow keys, or picked from the tabs; on phones the arrows are hidden and the tabs show as bars. Autoplay runs for reduced-motion users too; for them the slide change is a short plain slide and the scene effects and parallax are off.
- Hero scene effects: a subtle mouse parallax on the artwork (no cursor light and no "Drag" label); a lens glint, headphone sound waves and platform notifications on the cat slide; falling light streaks on the markets slide; floating bullion, face-aligned reflection sweeps and edge glints on the precious-metals slide. Bullion effects pause on inactive slides and are disabled for reduced motion.
- The partner card uses the glass ByteFX mark (`public/assets/partner/bytefx-glass-mark.webp`, cut out from the supplied artwork with a transparent background).
- The commodities bento card's artwork floats gently and, on desktop, tilts a few degrees toward the mouse anywhere over the card. Touch screens get the float only; reduced motion keeps it still.
- Testimonials auto-scroll as a seamless marquee: the list is rendered twice and the track slides by exactly half its width. Speed is a constant 34 px/s derived from the measured track width, and the animation pauses on hover, on press and on keyboard focus. The row is still a native horizontal scroller for touch and trackpad, the duplicate copy is `aria-hidden`, and `prefers-reduced-motion` stops the drift entirely.
- Menus support hover, click and Escape. Closed panels use the React boolean `inert` attribute.
- Broker cards support mouse dragging, native touch scrolling and previous/next buttons with disabled end states.
- Reveals use a shared requestAnimationFrame position check. Reduced motion disables decorative movement.
- Keyboard focus is visible, with a skip link to the main content.

## Validation

- Production build and ESLint passed.
- Chrome checks passed at 320, 390, 768, 1024 and 1440 pixels wide, without horizontal page overflow.
- Verified full-viewport closing height, eight cards, carousel navigation and end state, desktop/mobile menus, Escape, theme persistence and reduced motion.
- No browser console errors or broken images in the final checks.
- Verified desktop hand-held artwork, alternate mobile phone, three glass platform tabs, seven payment accordions including UPI, QR decoding, keyboard selection, Atlas, light theme and reduced motion at widths from 320 to 1440 pixels.
- The latest checks cover both payment illustrations, accordion expansion/collapse and keyboard navigation, a single mobile rating image, platform wallpaper contrast, and responsive layouts without runtime errors.
- Review screenshots are saved in `output/review/`.
- Precious-metals hero checked at 320, 390, 768, 1024 and 1440 pixels: no page overflow, readable actions, animated reflections, pointer response, slide wrap, mouse drag, keyboard navigation and reduced motion. Screenshots and results are saved as `output/review/precious-metals-*`.

## Brand icon

The favicon uses the symbol from the original ByteFX logo, exported at 32 and 192 pixels, with a 180-pixel Apple touch icon. Metadata in `app/layout.jsx` references these assets. Platform app-icon source URLs are recorded in `public/assets/platforms/icon-sources.json`.

## Blue mobile and payment revision

Desktop artwork is `public/assets/mobile/bytefx-handheld.webp`, copied unchanged from the supplied `Downloads/mobile.webp`. The small-screen alternative uses the actual chart screenshot in an upright frame. `site.iosAppUrl` remains null; add the approved App Store URL there to activate its badge. The 4.9/5 rating text was supplied and explicitly requested by the user; its source link is still pending. The QR continues to encode the confirmed Google Play URL.

The payment section uses `public/assets/generated/wallet-payment-methods.webp` (1100 × 1157, ~233 KB), the supplied full-colour wallet. It has a new file name on purpose: reusing `payment-wallet.webp` would let browsers and the image optimiser keep showing the previous grey wallet from cache. The earlier `payment-jar.png` and `payment-vault.png` are no longer used. Brand SVGs in the list stay separate and retain their original colors.

The mobile rating is a single generated badge at `public/assets/mobile/platinum-rating.png`, replacing the separate text, stars and drawn laurel. Exact prompts for all four new images are recorded in [payment-editorial-prompts.json](public/assets/generated/payment-editorial-prompts.json).

## Bento cards

- **Commodities** (`components/market-showcase.jsx`, `app/styles/market-showcase.css`): `public/assets/generated/markets-lineup.webp`. Copy, image and size are in `bento.markets` in `lib/content.js`. The revolving icon orbit has been removed.
- **Accounts** (second card, `#accounts`): copy on the left like the other cards ("Trade on your terms", Open live account); `public/assets/bento/account-trader.webp` stands on the right, cropped at the waist by the card edge. Below 1180px the copy sits on top and the trader below. Copy is `bento.account` in `lib/content.js`; the button uses `cta.href` (not set yet, like the other account links). The platforms themselves live in `#platform-guide`; `trade-everywhere.webp` is no longer used.
- **Refer a trader**: `public/assets/generated/refer-partners-grow.webp`; its mirror reflection is faded with a CSS mask so it never reaches the copy. `referral-cards.png` is still used by the Learn menu's feature panel.

## Mobile section colours

`app/styles/mobile-section.css` keeps every colour in `--mobile-*` variables. Light theme: the original blue. Dark theme: the same composition as the blue in lime — deep green behind the copy (#1f4200 → #3d7000) rising to bright lime (#9ccf18) with a soft highlight behind the phone, like light across a lime watch strap; "Your Hand" is #d6ff5a. On stacked layouts (≤980px) the green runs top-to-bottom so the centred copy stays on deep green and the glow rises behind the phone. This is the first green version, restored at the team's request after trying a flat logo green and a darker forest green. The section is about 90% of the screen tall (580–820px); the hand enters from the top edge and the whole phone sits inside with room below it.

## Hero on every screen

The hero fills the screen height from 560px (short laptops, 1080p at 150% Windows scaling) up to 1440px (1440p monitors); its type and spacing scale with the hero's height (`cqh`) as well as its width, so the copy never runs into the header or the slide tabs. Three layouts cover the rest:

- Portrait and square screens wider than a phone (tablets held upright, rotated monitors, a browser snapped to half a 1080p screen): the Mindset slide's portrait artwork would leave no room beside it, so that slide stacks — copy on top, artwork below.
- Phones held upright: copy on top, artwork below, from a 540px minimum height (iPhone SE with browser bars).
- Phones held sideways and other screens under 500px tall: the side-by-side layout, compressed, with the tabs shown as bars.

Checked on every slide at 1280×577, 1280×609, 1366×657, 1536×730, 1440×789, 1512×860, 1920×969, 2560×1297, 3440×1297, 3840×1960, 1024×640, 768×1024, 820×1180, 1024×1366, 1180×820, 960×969, 1100×969, 360×640, 375×548, 375×667, 390×844, 412×915, 430×932, 667×375, 740×360, 844×390 and 915×412: the copy clears the header and tabs, the tabs sit on screen, and nothing scrolls sideways.

## Build note

The CSS pipeline keeps only the last of `backdrop-filter` / `-webkit-backdrop-filter` when both are written. Write `-webkit-backdrop-filter` first and `backdrop-filter` second, otherwise Chrome receives only the prefixed property and nothing is blurred.

## Testimonials

`testimonials.items` in `lib/content.js` now holds ten reviews. **The quotes, names, roles and countries are placeholders written for this build — they are not real customer feedback and must be replaced with verified quotes before launch.** The card label reads "Trader review" rather than claiming verification.

Profile pictures are photorealistic **synthesised** faces from [thispersondoesnotexist.com](https://thispersondoesnotexist.com/) (StyleGAN2 on FFHQ), saved as 256 px WebP in `public/assets/voices/` with provenance in [sources.json](public/assets/voices/sources.json). They are public domain and depict nobody: attaching a real, identifiable person's photograph to a fabricated quote is not acceptable, and stock-library portraits are recognisable from other sites. Each face was chosen to match its reviewer's country, and all ten are adults. Earlier illustrated SVG avatars have been removed.

Country flags are local SVGs in `public/assets/flags/`; the previous flag emoji rendered as bare letter pairs because Windows ships no flag-emoji font. Ratings render five stars with the unearned ones dimmed.

## Three inner pages — September 22, 2026

The landing page is now `app/(site)/page.jsx`. The route-group layout shares the existing header, footer, skip link and Atlas across all four pages. Only implemented routes are enabled; homepage section links use `/#...` so they also work from inner pages.

- `/trading/account-types`: three account cards, selectable comparison, differences-only filter, mobile account switcher, EURUSD cost estimator, three-question account finder, included features and FAQs.
- `/trading/demo-account`: practice / prove / go-live sequence, demo-versus-live explanation, tournament placeholder, device selector and FAQs.
- `/trading/mobile-app`: keyboard-accessible five-tab app tour, features, store gallery, QR/store download band, cross-device section and FAQs.

All reuse the existing Figtree font, CSS tokens, buttons, reveal behavior, glass artwork, closing scene and theme handling. Each inner page has one green/dark or blue/light colour band. Account hero art has a blue light-theme alternative. Page metadata, canonical URLs, breadcrumb/FAQ structured data, sitemap and robots are included. New image variants are optimized WebP.

Account figures in `lib/accounts.js` are the supplied **proposed draft**, visibly marked throughout. EURUSD cost estimates use a 100,000-unit lot, $10/pip/lot, minimum spread and round-turn commission. XAUUSD and BTCUSD display TBC until contract specifications are supplied. The account finder is a product comparison, not a suitability assessment.

Set `site.liveAccountUrl`, `site.demoAccountUrl` and `site.iosAppUrl` when approved destinations are available. Demo access currently offers a real support-email action. Missing tournament dates, prizes, demo terms and three app screenshots remain explicitly marked. Tutorial links open the supplied YouTube channel; no individual video IDs were supplied. The gallery uses store images 1–3; store-0 is omitted because its 24/7 claim conflicts with the current 24/6 support copy.

Requested homepage edits: blue accounts card, removed extra hero action labels, recognizable YouTube / Instagram / X / LinkedIn logos and the four supplied profile URLs. No icon library added.

Validation artifacts are local under `output/review/` (ignored along with the browser profile). Production build and ESLint pass. Chrome checks cover both themes, 320/390/768/1024/1280/1440 widths, account filtering, selection, FAQs, keyboard app tabs, social destinations and broken images. Full Lighthouse scores have not been measured.

## Funding and getting started

Two more planned routes are now implemented and linked from navigation, footer, Atlas and the sitemap:

- `/trading/funding`: deposit/withdrawal method explorer with category filters, payment steps, a withdrawal timeline, payment checks, crypto network guidance and FAQs. Approved limits, fees, times and network availability remain TBC. UPI is explicitly pending regional eligibility confirmation.
- `/trading/getting-started`: Register / Verify / Fund / Trade navigation, a scroll-driven artwork sequence, an interactive preparation checklist, demo section, account/platform choices and FAQs. No personal data or documents are collected.

The development CSS resolution error was reproduced at `localhost:3000`. `inner-pages.css` is now imported directly by `app/layout.jsx`, with its rules kept in `@layer components`, instead of being resolved through Tailwind's nested `@import`. `trading-guides.css` follows the same pattern. The development homepage and all five inner pages return HTTP 200 and render their styles.

Both new pages were checked at 320, 390, 768, 1024, 1280 × 609 and 1440 pixels in dark/light themes. No horizontal overflow, broken images or browser runtime errors were found. Payment filtering, direction switching, network guidance, checklist changes, step artwork, reduced motion and shared styles were verified. Review artifacts: `output/review/guides-validation.json` and the funding/getting-started screenshots.

## Inner pages

The landing page (`/`) is unchanged. Inner pages share `components/inner/page-kit.jsx` and `app/styles/site-pages.css`. In light mode every `.inner-page` takes the blue accent (`#1769c9`) used by the landing's "Trade with a global broker" section; dark mode keeps lime. Theme-paired artwork uses `ThemeArt` (green/lime for dark, blue for light).

| Route | Content source |
| --- | --- |
| `/trading/account-types` | `lib/accounts.js`, `lib/pages/account-types.js` — Standard, Pro and Custom from bytefx.com |
| `/trading/mobile-app` | Opens with the landing's `MobileSection` |
| `/trading/funding` | `lib/pages/funding.js` — withdrawal times from bytefx.com |
| `/trading/getting-started` | `lib/pages/getting-started.js` |
| `/markets` | `lib/pages/markets.js` — one page; menu links jump to `#forex`, `#crypto`, `#stocks`, `#commodities`, `#indices`, `#energy`, `#tools` |
| `/partners` | `lib/pages/partners.js` — from bytefx.com/partnership |
| `/about`, `/why-bytefx`, `/trust-security`, `/contact`, `/legal` | `lib/pages/company.js`; policy PDFs in `documents` in `lib/content.js` |

The Partners hero uses the landing hero's first image (`hero-mindset.webp`). The other three landing hero images appear as captioned photo bands: Global markets on About, Precious metals on Why ByteFX, Stay cool on Trust & security.

`/trading/demo-account` was removed; `next.config.mjs` redirects it to Account types. Enquiry forms (Partners, Contact) open the visitor's email app addressed to support until a form backend is connected. Client-area links use `site.registerUrl` and `site.portalLoginUrl` in `lib/content.js`.
#   m a i n _ b y t e f x - l a n d i n g _ p a g e 
 
 
## Market pages and trader tools — September 24, 2026

Each market has its own page, built from one template (`app/(site)/markets/[market]/page.jsx`, sections in `components/markets/`, content in `lib/pages/markets.js`). The layout follows elefin.com's market pages, with no image assets:

1. Hero: heading and one call to action over a CSS grid and glow, with a chart line drawn in code (a repeatable line per market, not price data).
2. Market switcher: all six markets as pills, the current one highlighted.
3. Trading instruments: heading, four stats and a live price table (`components/markets/price-table.jsx`). Prices come from `/api/quotes?market=<id>` (Yahoo Finance's public chart data, cached 15 seconds) and refresh every 15 seconds; a moved price flashes once. If the feed is down, a TradingView board with the same symbols is shown instead.
4. Tabbed topics: three tabs of cards per market (`components/markets/market-tabs.jsx`), keyboard accessible.
5. Platforms: MetaTrader 5, TradingView and the ByteFX app.
6. FAQ: four questions per market.
7. Closing colour band (green in dark mode, blue in light) with the leverage figure.

`/markets` stays as the overview, unchanged; its market blocks keep their `#anchors` and link on to each page.

| Route | Content |
| --- | --- |
| `/markets/forex`, `/crypto`, `/stocks`, `/commodities`, `/indices`, `/energy` | `lib/pages/markets.js` (`hero`, `instruments`, `rows`, `tabs`, `faqs`, `calc` per market) |
| `/tools/calculator` | Currency converter (`components/tools/currency-converter.jsx`) |
| `/tools/trading-calculator` | Margin, pip value and swap (`components/tools/trading-calculator.jsx`); accepts `?symbol=XAUUSD` |
| `/tools/calendar` | TradingView economic calendar |
| `/tools/quotes` | TradingView market quotes, one tab per market |

Tool paths match the live bytefx.com URLs. `/tools` redirects to `/markets#tools`. Each tool page has two sections: the tool, then links to the other tools.

- **Rates:** `app/api/rates/route.js` fetches Coinbase's public exchange rates (fiat, BTC, ETH, USDT, gold, silver), falls back to open.er-api.com (fiat only), and caches for 60 seconds on the server and at the edge. To use ByteFX's own feed, replace `fetchPrimary` and keep the response shape.
- **Price tables:** `app/api/quotes/route.js` reads symbols from `rows` in `lib/pages/markets.js`, never from the request. Yahoo Finance's chart endpoint is public but unofficial; to use ByteFX's own feed, replace `fetchQuote` and keep the row shape. Commodity and energy rows use futures prices.
- **TradingView widgets:** `components/tools/tv-widget.jsx` rebuilds the widget when the theme changes and keeps TradingView's required attribution link. The quotes tool and the price-table fallback use the TradingView symbol in each row.
- **Drafts:** contract sizes in `lib/instruments.js` are standard MT5 values (`specsConfirmed = false` shows a note on the calculator). Swap rates are entered by the visitor. Stock, index and most crypto symbols in the price tables are not a confirmed ByteFX list.

Navigation, footer (Energy added), About page, Atlas, sitemap and the header's current-menu marker were updated. Production build and ESLint pass. Checked at 390 and 1440 px in both themes with mocked rates and prices; Yahoo Finance, Coinbase and the TradingView widgets could not be reached from the build sandbox and need a check on a networked machine.
