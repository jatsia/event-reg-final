# Event Registry

A focused browser-based workspace for creating events, managing registrations,
and giving attendees a clear registration experience.

## Current phase

The application includes a responsive monochrome shell, an Events index, and a
reusable Event editor for create and edit flows. Domain and application rules
validate event data, future publication dates, and capacity changes before the
in-memory repository is updated. All visible records are labeled sample data
and reset when the page refreshes.

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
|   |   |-- editor.js
|   |   |-- events.js
|   |   |-- index.js
|   |   `-- router.js
|   `-- styles/
|       |-- events.css
|       `-- forms.css
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
