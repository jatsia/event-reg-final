# Event Registry

A focused browser-based workspace for creating events, managing registrations,
and giving attendees a clear registration experience.

## Current phase

The application includes a responsive monochrome shell and the first complete
screen: an Events index backed by domain validation, application read logic,
and in-memory repositories. Reusable sidebar, navigation, route, icon, and DOM
modules keep the presentation layer focused. The visible records are clearly
labeled sample data and reset when the page refreshes. Forms arrive later.

## Run locally

From the repository root, run:

```sh
make dev
```

Then open `http://localhost:8000`.

Running `make` without a target does the same thing. To use another port, run
`make dev EVENT_PORT=9000`.

## Check the project

Run the current syntax checks with:

```sh
make check
```

## Structure

```text
Makefile
package.json
frontend/
|-- assets/
|   `-- logo.png
|-- index.html
|-- src/
|   |-- main.js
|   |-- application/
|   |-- domain/
|   |-- infrastructure/
|   |-- presentation/
|   |   |-- components/
|   |   |-- events.js
|   |   |-- index.js
|   |   `-- router.js
|   `-- styles/
`-- tests/
```

The app uses native HTML, CSS, and JavaScript modules with no build process or
runtime dependencies. The root `Makefile` is the stable entry point; it can be
updated to start the frontend, API, and database together when those services
are introduced.

## Design principles

- Adaptive monochrome palette with a native system font stack and Inter fallback.
- Original calendar-ticket line mark with no text or initials.
- Softly curved content and navigation surfaces with restrained depth.
- Compact desktop sidebar that becomes horizontal navigation on small screens.
- Controls use comfortable 44px targets and clearly differentiated states.
- Semantic structure, visible keyboard focus, and reduced-motion support.
- No decorative gradients, glass effects, fake metrics, or inactive controls.
