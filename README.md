# Event Registry

A focused browser application with a manager workspace for creating events and
managing registrations, plus a separate public-facing attendee experience.

## Implementation status

The frontend MVP is feature-complete; the assignment's human review and
submission steps are still pending. Managers can create, inspect, edit, publish,
close, and safely remove events. Attendees can browse available events, enter
and review their details, confirm one place, and see a registration reference.
Managers can then cancel registrations and remove canceled records.

Manager routes use the workspace sidebar, while attendee routes use a standalone
public header with no event-management navigation. Both experiences stay in the
same browser session so changes remain connected during the demonstration.

Shared native modals protect consequential choices, while brief feedback appears
in dismissible upper-right toasts. The event and registration feature modules
validate data, lifecycle availability, capacity, and removal safety before their
in-memory stores are updated. All records are sample data and reset when the page
refreshes.

## Workflows

- Manager: Events → Event detail → Create or edit → Publish or close → Remove.
- Handoff: Events → Preview attendee page.
- Attendee: Registration page → Event → Attendee details → Review → Confirmation.
- Registration management: Registrations → Cancel → Remove canceled record.

### CRUD map

The CRUD functions are grouped by feature instead of being scattered across
one-file layers:

| Operation | Events | Registrations |
| --- | --- | --- |
| Create | `events/service.js` → `createEventRecord` | `registrations/service.js` → `createRegistrationRecord` |
| Read | `events/service.js` → `readEvent`, `readEvents`, `readOpenEvents` | `registrations/service.js` → `readRegistrations` |
| Update | `events/service.js` → `updateEventRecord` | `registrations/service.js` → `cancelRegistrationRecord` |
| Delete | `events/service.js` → `removeEventRecord` | `registrations/service.js` → `removeRegistrationRecord` |

Each feature's `model.js` owns validation and its `store.js` provides the
in-memory create, read, update, and remove mechanics.

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

## Quick start

You need `make` and Python 3 to run the app. Node.js is needed only for the
tests. There are no packages to install and no database to set up.

For a fresh checkout:

```sh
git clone https://github.com/jatsia/event-registration.git
cd event-registration
make dev
```

If you already have the repository, run `make dev` from its root instead. Then
open [Manager workspace](http://localhost:8000/#events). The manager's
**Preview attendee page** button opens the attendee view in the same tab. You
can also open the [attendee page](http://localhost:8000/#register) directly.

Press `Ctrl-C` in the terminal to stop the server. If port 8000 is busy, use
`make dev EVENT_PORT=9000` and open `http://localhost:9000/#events`.

### Demo both roles

Keep the demo in one browser tab so the in-memory data is preserved:

1. Create a future published event in the manager workspace.
2. Select **Preview attendee page**. The manager sidebar disappears.
3. Register an attendee and confirm the registration.
4. Select **Manager workspace** in the public header.
5. Open **Registrations** and show the new record and updated availability.

Opening a new tab or refreshing starts a new sample session because this
milestone intentionally has no API or database. The GitHub repository contains
the source code; the links above work after you start the local server.

## Check the project

Run JavaScript syntax checks, public-module resolution, and the automated test
suite with:

```sh
make check
```

The command enforces 100% line, branch, and function coverage for the event and
registration models, CRUD services, and stores. Browser-facing screen modules
are syntax and import checked; their visual, keyboard, and responsive behavior
remains part of the required human review.

## Structure

```text
Makefile
package.json
frontend/
|-- assets/
|   `-- logo.png
|-- index.html
|-- tests/
|   |-- events.test.js
|   |-- registrations.test.js
|   `-- routes.test.js
|-- src/
|   |-- main.js
|   |-- events/
|   |   |-- browse.js
|   |   |-- detail.js
|   |   |-- editor.js
|   |   |-- index.js
|   |   |-- list.js
|   |   |-- model.js
|   |   |-- service.js
|   |   `-- store.js
|   |-- registrations/
|   |   |-- confirmation.js
|   |   |-- form.js
|   |   |-- index.js
|   |   |-- list.js
|   |   |-- model.js
|   |   |-- service.js
|   |   |-- store.js
|   |   `-- summary.js
|   |-- shared/
|   |   |-- dom.js
|   |   |-- format.js
|   |   |-- icons.js
|   |   |-- modal.js
|   |   |-- router.js
|   |   |-- shell.js
|   |   |-- status.js
|   |   `-- toast.js
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

The source is organized by feature so related code stays together:

- `main.js` creates the in-memory stores, connects the two features, and starts
  the router and shared interface helpers.
- `events/` owns event validation, CRUD operations, sample data, and the event
  list, detail, editor, and public browsing screens.
- `registrations/` owns attendee validation, registration CRUD operations, its
  in-memory store, and the form, review, confirmation, and management screens.
- `shared/` contains small reusable browser helpers. It has no event or
  registration business rules.
- `styles/` keeps design tokens and base layout separate from feature and
  feedback styles. `index.css` is the single stylesheet loaded by the page.
- `tests/` verifies routes plus all model, CRUD service, and store behavior.

Within each feature, `model.js` validates and creates records, `service.js`
contains the user-facing CRUD rules, `store.js` handles in-memory storage, and
`index.js` exposes the feature's public functions. The remaining files render
the screens for that feature.

The usual flow is: a screen collects input → a service applies the rules → a
model validates the record → a store reads or changes the in-memory data → the
screen renders the result. This keeps the code direct without adding framework
or architecture layers the project does not need.

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
