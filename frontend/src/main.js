import { readEvents } from "./application/event/index.js";
import { createEventMemory, createEventSeed } from "./infrastructure/event/index.js";
import { createRegistrationMemory } from "./infrastructure/registration/index.js";
import {
  initializeEvents,
  initializeRouter,
  initializeSidebar,
} from "./presentation/index.js";

initializeSidebar();
initializeRouter();

const eventRepository = createEventMemory(createEventSeed());
const registrationRepository = createRegistrationMemory();

initializeEvents({
  loadEvents: () => readEvents({ eventRepository, registrationRepository }),
});
