import test from "node:test";
import assert from "node:assert/strict";

import { readEvents } from "../src/application/event/index.js";
import { createEvent, EventValidationError } from "../src/domain/event/index.js";
import { createEventMemory } from "../src/infrastructure/event/index.js";
import { createRegistrationMemory } from "../src/infrastructure/registration/index.js";

const validEvent = {
  id: "later-event",
  title: "Later Event",
  description: "A valid event used by the test suite.",
  startsAt: "2026-12-10T10:00:00+08:00",
  timeZone: "Asia/Manila",
  venue: "Makati",
  capacity: 2,
  status: "published",
};

test("createEvent normalizes and freezes valid event data", () => {
  const event = createEvent({ ...validEvent, title: "  Later Event  " });

  assert.equal(event.title, "Later Event");
  assert.equal(Object.isFrozen(event), true);
});

test("createEvent rejects invalid event data", () => {
  assert.throws(
    () => createEvent({ ...validEvent, capacity: 0 }),
    (error) =>
      error instanceof EventValidationError &&
      error.errors.capacity === "Capacity must be a positive whole number.",
  );
});

test("readEvents sorts events and derives registration totals", async () => {
  const earlierEvent = createEvent({
    ...validEvent,
    id: "earlier-event",
    title: "Earlier Event",
    startsAt: "2026-11-10T10:00:00+08:00",
  });
  const laterEvent = createEvent(validEvent);
  const eventRepository = createEventMemory([laterEvent, earlierEvent]);
  const registrationRepository = createRegistrationMemory([
    { eventId: earlierEvent.id, status: "confirmed" },
    { eventId: earlierEvent.id, status: "canceled" },
  ]);

  const events = await readEvents({ eventRepository, registrationRepository });

  assert.deepEqual(
    events.map((event) => event.id),
    ["earlier-event", "later-event"],
  );
  assert.equal(events[0].registrationCount, 1);
  assert.equal(events[0].remainingCapacity, 1);
});
