import {
  createEventRecord,
  readEvents,
  updateEventRecord,
} from "./application/event/index.js";
import { createEventMemory, createEventSeed } from "./infrastructure/event/index.js";
import { createRegistrationMemory } from "./infrastructure/registration/index.js";
import {
  initializeEditor,
  initializeEvents,
  initializeModal,
  initializeRouter,
  initializeSidebar,
  initializeToasts,
} from "./presentation/index.js";

initializeSidebar();

const modal = initializeModal();
const toasts = initializeToasts();

const eventRepository = createEventMemory(createEventSeed());
const registrationRepository = createRegistrationMemory();

let eventsView;

const editor = initializeEditor({
  saveEvent: ({ id, attributes }) =>
    id
      ? updateEventRecord({
          id,
          attributes,
          eventRepository,
          registrationRepository,
        })
      : createEventRecord({
          attributes,
          eventRepository,
          createId: () => crypto.randomUUID(),
        }),
  onSaved: async (event, action) => {
    window.location.hash = "events";
    await eventsView.render();
    toasts.show(`${event.title} ${action}.`);
  },
  confirmDiscard: () =>
    modal.ask({
      heading: "Discard changes?",
      description: "Your unsaved event changes will be lost.",
      confirmLabel: "Discard changes",
      destructive: true,
    }),
});

eventsView = initializeEvents({
  loadEvents: () => readEvents({ eventRepository, registrationRepository }),
  onEdit: (event) => {
    editor.open(event);
    window.location.hash = "editor";
  },
});

document.querySelector("[data-new-event]")?.addEventListener("click", () => {
  editor.open();
  window.location.hash = "editor";
});

initializeRouter();
