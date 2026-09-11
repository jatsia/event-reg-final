# Event Registry

A focused browser-based workspace for creating events, managing registrations,
and giving attendees a clear registration experience.

## Current phase

The first phase establishes the responsive application shell and monochrome
design system. It includes working navigation between event management,
registration management, and the public attendee view. Event data and forms
will be introduced in later phases.

## Run locally

Serve the `frontend/` directory with any static web server. For example, from
the repository root:

```sh
python3 -m http.server 8000 --directory frontend
```

Then open `http://localhost:8000`.

## Structure

```text
frontend/
|-- index.html
`-- src/
    |-- main.js
    |-- presentation/
    |   |-- index.js
    |   `-- navigation.js
    `-- styles/
        |-- base.css
        |-- index.css
        |-- layout.css
        `-- tokens.css
```

The app uses native HTML, CSS, and JavaScript modules with no build process or
runtime dependencies.

## Design principles

- Monochrome palette with a native system font stack and Inter fallback.
- Compact desktop sidebar that becomes horizontal navigation on small screens.
- Semantic structure, visible keyboard focus, and reduced-motion support.
- No decorative gradients, glass effects, fake metrics, or inactive controls.
