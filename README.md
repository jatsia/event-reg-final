# Event Registry

A focused browser-based workspace for creating events, managing registrations,
and giving attendees a clear registration experience.

## Implementation status

The frontend MVP is feature-complete; the assignment's human review and
submission steps are still pending. Managers can create, inspect, edit, publish,
close, and safely remove events. Attendees can browse available events, enter
and review their details, confirm one place, and see a registration reference.
Managers can then cancel registrations and remove canceled records.

Shared native modals protect consequential choices, while brief feedback appears
in dismissible upper-right toasts. The event and registration feature modules
validate data, lifecycle availability, capacity, and removal safety before their
in-memory stores are updated. All records are sample data and reset when the page
refreshes.

## Workflows

- Manager: Events → Event detail → Create or edit → Publish or close → Remove.
- Attendee: Registration page → Event → Attendee details → Review → Confirmation.
- Registration management: Registrations → Cancel → Remove canceled record.

## Assignment coverage

The implemented application covers the Milestone 1 technical requirements:

- Meaningful HTML structure for navigation, page sections, forms, lists, and
  status messages.
- Organized, responsive CSS split into foundations and screen-specific files.
- JavaScript controls that validate input, update content, handle conditional
  event states, and complete both manager and attendee workflows.
- A browser-based application aligned with the event-registration concept.
- Automated coverage for event and registration rules, CRUD operations,
  availability, removal protection, and route mapping.

No database or API is required by the supplied assignment. Data intentionally
remains in memory and resets on refresh.

### Required before submission

These assignment requirements require the team and cannot be completed by the
application code alone:

- [ ] Open the final application and review every control, input, content
  update, and conditional response.
- [ ] Check keyboard use, the accessibility tree, browser console, 200% zoom,
  and narrow, tablet, and desktop layouts.
- [ ] Conduct the Milestone 1 team discussion covering structure and content,
  presentation and usability, interactivity, workflow alignment, and team
  reflection.
- [ ] Update the Browser-Based Application Development Workflow Worksheet,
  including project/repository information, Weeks 2–5 progress, essential
  features, interaction areas, implementation order and dependencies, scope
  review, group notes, reflection, and the Team Contributions Table.
- [ ] Have every member prepare their own AI Use Statement explaining
  significant assistance and how outputs were reviewed and incorporated.
- [ ] Commit the team-approved files, push the latest version to GitHub, and
  verify every worksheet link.

Significant AI-assisted work to evaluate and disclose includes application
planning, code organization, interaction and validation refinements, testing
ideas, documentation organization, and generation of the original logo. Each
member remains responsible for writing their own statement in their own words.

## Run locally

From the repository root, run:

```sh
make dev
```

Then open `http://localhost:8000`.

Running `make` without a target does the same thing. To use another port, run
`make dev EVENT_PORT=9000`.

## Check the project

Run JavaScript syntax checks, public-module resolution, and the automated test
suite with:

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
|-- tests/
|-- src/
|   |-- events/
|   |-- registrations/
|   |-- shared/
|   |-- main.js
|   `-- styles/
|       |-- base.css
|       |-- events.css
|       |-- feedback.css
|       |-- forms.css
|       |-- index.css
|       |-- layout.css
|       |-- registrations.css
|       `-- tokens.css
```

The app uses native HTML, CSS, and JavaScript modules with no build process or
runtime dependencies. The root `Makefile` is the stable entry point; it can be
updated to start the frontend, API, and database together when those services
are introduced.

Personal attendee information exists only in memory for the current browser
session. The application does not send email, process payment, or persist data.

## Design principles

- Adaptive monochrome palette with a native system font stack and Inter fallback.
- Original calendar-ticket line mark with no text or initials.
- Softly curved content and navigation surfaces with restrained depth.
- Compact desktop sidebar that becomes horizontal navigation on small screens.
- Controls use comfortable 44px targets and clearly differentiated states.
- Semantic structure, visible keyboard focus, and reduced-motion support.
- No decorative gradients, glass effects, fake metrics, or inactive controls.
