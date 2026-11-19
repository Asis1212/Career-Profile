# How this website is built

This is a short tour of the personal site in this folder. It is written for someone who is new to web development. You do not need to have used Next.js before.

The site is one long page. It introduces Elad Asis to companies that might hire him: current role, career timeline, full-stack and AI skills, education, and a way to get in touch. There is no database and no login. The words on the page live in a TypeScript file, and React turns that data into HTML.

## 1. Three tools, in plain language

**HTML** is the structure of a page: headings, paragraphs, links, lists.

**CSS** is the look: colors, fonts, spacing, and what happens on a phone versus a wide screen.

**JavaScript** is behavior: open a menu, notice that the user scrolled, hide and show something.

This project uses three libraries on top of those:

| Piece | What it is here |
| --- | --- |
| React | A way to describe the page as components. A component is a function that returns HTML-like markup. |
| Next.js | The framework that runs React, serves the site, and decides which file is the homepage. |
| TypeScript | JavaScript with types. A type says “this value is a string” or “this list has `year` and `label`”. The editor can then catch mistakes before the page runs. |

You write components in files that end in `.tsx`. That means “TypeScript plus JSX”. JSX looks like HTML inside JavaScript:

```tsx
<h1>Elad Asis</h1>
```

That is not a string. It becomes a React element, and React turns it into a real `<h1>` in the browser.

## 2. Project structure

Only the files you edit matter day to day. The rest is generated.

```text
site/
  app/
    layout.tsx      the shell around every page (fonts, <html>, <body>)
    page.tsx        the homepage
    globals.css     all of the visual design
    icon.svg        the small tab icon
  components/
    site-header.tsx the top bar and the mobile menu
  lib/
    profile.ts      the career facts the page displays
  package.json      project name and the commands npm can run
  tsconfig.json     TypeScript settings, including the @/ import shortcut
  next.config.ts    a few Next.js settings
  tutorial.md       this file
```

Two folders appear after you install and run the app. You do not edit them.

- `node_modules/` is every installed library (Next.js, React, TypeScript).
- `.next/` is the compiled output Next.js builds while the dev server runs.

`linkedin.pdf` is the source profile the copy was written from. The running site does not open that PDF. The text was copied into `lib/profile.ts` by hand.

## 3. Run it

From this folder, in a terminal:

```bash
npm install
npm run dev
```

`npm install` reads `package.json` and downloads the libraries into `node_modules/`.

`npm run dev` starts Next.js in development mode on port 3000. Open [http://localhost:3000](http://localhost:3000). When you save a file, the page refreshes. That is called hot reload.

The other scripts:

- `npm run build` compiles a production version into `.next/`.
- `npm start` serves that production build, also on port 3000. Use this after `build`, not at the same time as `dev`.

## 4. What happens when the browser asks for the page

This is the whole integration, before the details.

```text
Browser asks for http://localhost:3000
        |
        v
Next.js sees there is no extra path, so it loads app/page.tsx
        |
        v
It wraps that page in app/layout.tsx
        |
        +-- layout loads fonts and app/globals.css
        +-- layout prints <html> and <body>
        |
        v
page.tsx imports the header and the profile data
        |
        +-- SiteHeader  (components/site-header.tsx)
        +-- profile, path, chapters, skillGroups, schools  (lib/profile.ts)
        |
        v
React renders one HTML document
CSS class names on those elements pick up rules in globals.css
        |
        v
The browser paints the page
On a narrow screen, the header's JavaScript can open the menu
```

Next.js uses the **App Router**. The `app` folder is special:

- `app/layout.tsx` is the root layout. It must render `{children}`.
- `app/page.tsx` is the route `/`. A folder named `about` with its own `page.tsx` would become `/about`. This site has only the homepage, so there is one route.

The import `@/lib/profile` works because `tsconfig.json` says `"@/*"` means “start at the project root”. So `@/components/site-header` is the file `components/site-header.tsx`. You could also write a relative path such as `../components/site-header`. The `@/` form stays readable when files move.

## 5. The data file: `lib/profile.ts`

The page does not hard-code every job inside the JSX. The facts are exported from `lib/profile.ts`, and the page loops over them.

`export` means another file is allowed to import that name.

There are five exports:

1. `profile` — name, email, LinkedIn URL, the headline, and the short introduction under the name.
2. `path` — four short beats for the strip under the hero (`2017 Service desk`, and so on).
3. `chapters` — the job timeline, newest first. Each item has `org`, `role`, `when`, `place`, and `summary`.
4. `skillGroups` — two groups. The first is “Full-stack and AI”. The second is “Quality & systems”. Each group has a title, a short intro, a `tone` (`"dark"` or `"warm"`), and a list of skills.
5. `schools` — HIT and ORT.

`tone: "dark" as const` tells TypeScript the value is the exact string `"dark"`, not just any string. The page later uses that string as a CSS class: `panel dark`.

If you change a job title in `profile.ts` and save, the homepage updates. You do not have to touch the timeline markup, because the timeline is generated from this list.

## 6. The shell: `app/layout.tsx`

Every page is rendered inside the layout. The layout’s job is the stuff that should exist once, around the page.

### Fonts

```tsx
import { DM_Mono, Figtree, Fraunces } from "next/font/google";
```

`next/font` downloads the fonts at build time and exposes them as CSS variables:

- `--font-body` is Figtree (paragraphs and buttons).
- `--font-display` is Fraunces (the big headings).
- `--font-mono` is DM Mono (small labels such as dates).

Those variables are placed on the `<html>` element through `className`. `globals.css` then says, for example, `font-family: var(--font-display)`.

### Metadata

`export const metadata` is not drawn on the page. Next.js turns it into `<title>` and `<meta>` tags in the document head. That is the text in the browser tab and the text a link preview can show.

### JSON-LD

`jsonLd` is a JavaScript object in [schema.org](https://schema.org) shape. The layout prints it as:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

Search engines can read that script and understand “this page is about a person named Elad Asis”. `dangerouslySetInnerHTML` means “put this string into the DOM as HTML”. It is safe here because the string is `JSON.stringify` of data we wrote ourselves, not text typed by a visitor.

### Children

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
```

`children` is whatever page Next.js is showing. For `/`, that is the result of `app/page.tsx`. The layout also adds a “Skip to content” link (for keyboard users) and a vertical rail of text on wide screens.

## 7. The page: `app/page.tsx`

`HomePage` is a normal function. It returns one tree of elements. The default export is what Next.js renders for `/`.

The first lines pull in the other parts:

```tsx
import { SiteHeader } from "@/components/site-header";
import { chapters, path, profile, schools, skillGroups } from "@/lib/profile";
```

Then the tree is:

1. `<SiteHeader />` — the sticky bar.
2. `<main id="content">` — everything else. The skip link points at `#content`.
3. A footer with the year and the email.

Inside `<main>` the sections are, in order:

| Section `id` | What you see |
| --- | --- |
| `top` | Name, headline, email and LinkedIn buttons, the “at a glance” card, the four-year strip |
| `about` | Three short paragraphs |
| `journey` | One block per item in `chapters` |
| `skills` | One panel per item in `skillGroups` |
| `education` | One card per item in `schools` |
| `contact` | The dark closing panel with email, LinkedIn, and city |

### Showing data inside JSX

Curly braces jump from HTML back into JavaScript:

```tsx
<p className="headline">{profile.headline}</p>
```

`profile.headline` is the string from `lib/profile.ts`. React inserts that string into the paragraph.

A link is built the same way:

```tsx
href={`mailto:${profile.email}`}
```

The backticks are a template string. If the email is `asiselad12@gmail.com`, the attribute becomes `mailto:asiselad12@gmail.com`.

### Lists: `.map()`

The timeline is not six copies of the same markup. It is one pattern, repeated:

```tsx
{chapters.map((chapter) => (
  <li key={`${chapter.org}-${chapter.when}`}>
    ...
    <h3 className="org">{chapter.org}</h3>
    <p className="role">{chapter.role}</p>
    <p>{chapter.summary}</p>
  </li>
))}
```

`.map()` walks the array. For each chapter it returns a `<li>`. React needs `key` so it can tell the items apart when the list changes. The key here is the company name plus the dates, which is unique in this list.

The same pattern builds the year strip (`path`), the skill chips (`group.items`), and the school cards (`schools`).

### Class names, not inline styles

Almost every element has `className`. In React the HTML attribute `class` is spelled `className`, because `class` is a reserved word in JavaScript.

```tsx
<article key={group.id} className={`panel ${group.tone}`}>
```

If `group.tone` is `"dark"`, the element’s classes are `panel dark`. `globals.css` has rules for `.panel` and for `.panel.dark`. The data file chooses the look. The CSS file defines what that look is.

### This page does not use `"use client"`

`page.tsx` and `layout.tsx` are **Server Components**. They run on the server (during `next dev`, that server is your machine). They can import data and render HTML without shipping that rendering logic to the browser.

That is enough here because the page does not use `useState` or `useEffect`. The header does, so the header is a Client Component. A Server Component is allowed to render a Client Component. The page does that with `<SiteHeader />`.

## 8. The header: `components/site-header.tsx`

The first line is:

```tsx
"use client";
```

That marks the file as a Client Component. Its JavaScript is sent to the browser, because it needs to react to clicks and scrolling.

### State

```tsx
const [open, setOpen] = useState(false);
const [stuck, setStuck] = useState(false);
```

`useState` keeps a value that can change, and a function that changes it.

- `open` is whether the mobile menu is visible. It starts `false`.
- `stuck` is whether the bar should pick up the solid background. It becomes `true` after the user scrolls more than 8 pixels.

Calling `setOpen(true)` re-renders this component. React then updates the button label and the menu.

### Effects

`useEffect` runs after the component is on the page.

The first effect listens to `window` scroll and updates `stuck`. The function it returns removes that listener when the component goes away. Without that cleanup, every visit would add another listener.

The second effect does two things while `open` is true:

- It sets `document.body.style.overflow = "hidden"` so the page behind the menu does not scroll.
- It listens for the Escape key and closes the menu.

The dependency array `[open]` means “run this again when `open` changes”.

### Two menus, one list of links

`links` is a small array: Journey, Skills, Education, Contact. The desktop `<nav className="nav">` and the mobile `<nav className="mobile-nav">` both `.map()` that same array. The labels cannot drift apart, because there is only one list.

Each `href` is a hash link, such as `#skills`. The matching section in `page.tsx` has `id="skills"`. The browser scrolls to that element. `globals.css` sets `scroll-padding-top` so the sticky header does not cover the heading.

The mobile `<nav>` uses the HTML `hidden` attribute:

```tsx
hidden={!open}
```

When `open` is false, `hidden` is true and CSS forces `display: none`. When the user taps a link, `onClick` calls `setOpen(false)`, so the menu closes after the jump.

The button swaps its icon with a condition:

```tsx
{open ? <svg>...X...</svg> : <svg>...three bars...</svg>}
```

`aria-expanded` and `aria-label` tell assistive technology whether the menu is open. `aria-hidden` on the icon means “this drawing is decoration; the button label already explains it”.

## 9. The design: `app/globals.css`

There is one stylesheet, imported by the layout, so it applies to the whole site.

The top of the file is a set of **CSS variables** on `:root` (the whole document):

```css
:root {
  --paper: #07101c;
  --ink: #f4f7fb;
  --copper: #7cf0d4;
  ...
}
```

Later rules say `color: var(--ink)` instead of repeating the hex code. Change a variable once and every use of it updates.

The dark background is not a photograph. It is the page color plus a few `radial-gradient` glows (soft blue, teal, and a little warm light).

The important class groups match the JSX:

| Classes | Role |
| --- | --- |
| `.wrap` | Centers the content and limits its width |
| `.site-header`, `.is-stuck` | The bar; `.is-stuck` adds the blurred background after scroll |
| `.hero-grid` | Two columns on a wide screen: the name on the left, the card on the right |
| `.path` | The four career beats |
| `.timeline` | The jobs, with a line and a dot |
| `.panel`, `.panel.dark`, `.panel.warm` | Skill groups |
| `.chip` | One skill inside a panel |
| `.contact-panel` | The closing block |

### Wide screen and phone

`@media (max-width: 980px)` is a rule that applies only when the window is 980 pixels wide or narrower.

Under that width the CSS:

- stacks the hero, the about columns, the timeline, and the contact panel into one column
- hides `.nav` (the desktop links)
- shows `.menu-toggle` (the button was `display: none` by default)
- shows `.mobile-nav` as a full-screen layer under the header

Under 640 pixels, skill chips and the year strip become a single column, and the email buttons stretch to full width.

`@media (prefers-reduced-motion: reduce)` turns off the pulsing dot and the button motion for people who have asked their system to reduce animation.

## 10. How a single skill gets on the screen

Follow one fact all the way through. Take “React”.

1. In `lib/profile.ts`, inside `skillGroups[0].items`, there is `{ name: "React", detail: "Interfaces built from components and state." }`.
2. `app/page.tsx` imports `skillGroups`.
3. The skills section maps each group, then maps `group.items`.
4. For React it renders:

```tsx
<div className="chip">
  <strong>React</strong>
  <span>Interfaces built from components and state.</span>
</div>
```

5. That group’s `tone` is `"dark"`, so the parent is `<article className="panel dark">`.
6. `globals.css` paints `.panel.dark` with the blue-teal gradient and `.chip` with the translucent card.

Nothing else “fetches” React. There is no API call. The integration is: **data module → page loop → CSS class**.

The jobs and the schools use that same path. The header’s links use a smaller version of it: an array in the header file, mapped twice.

## 11. The tab icon

`app/icon.svg` is a special file name. Next.js serves it as the favicon (the tiny image on the browser tab). You do not import it in `page.tsx`. Putting the file in `app/` is the integration.

## 12. `next.config.ts`

This file is optional configuration:

- `reactStrictMode: true` renders components twice in development so accidental bugs show up early. It does not do that in production.
- `poweredByHeader: false` stops Next.js from adding an `X-Powered-By` header.
- `devIndicators: false` hides the small Next.js badge in the corner during development.
- `outputFileTracingRoot` tells Next.js that this folder is the project root, which matters on this machine because another `package-lock.json` exists higher up in the home directory.

## 13. Where to change things

| You want to… | Edit |
| --- | --- |
| Change a sentence, a job, or a skill | `lib/profile.ts` |
| Add another section on the page | `app/page.tsx`, and give it an `id` if the menu should link to it |
| Add a menu item | the `links` array in `components/site-header.tsx`, and a matching `id` in `app/page.tsx` |
| Change colors, spacing, or the phone layout | `app/globals.css` |
| Change the browser-tab title | `metadata` in `app/layout.tsx` |
| Change the tab icon | `app/icon.svg` |

A safe first edit: in `lib/profile.ts`, change `headline`, save, and watch the line under the name update. Then add one object to `path` and see a fifth beat appear in the strip, without writing a new `<li>` by hand.
