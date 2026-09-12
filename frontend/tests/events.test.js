import test from "node:test";
import assert from "node:assert/strict";

import {
  createEventRecord,
  readEvents,
  updateEventRecord,
} from "../src/application/event/index.js";
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

test("createEventRecord validates publication and stores the event", async () => {
  const eventRepository = createEventMemory();

  const event = await createEventRecord({
    attributes: validEvent,
    eventRepository,
    createId: () => "created-event",
    now: new Date("2026-09-12T00:00:00+08:00"),
  });

  assert.equal(event.id, "created-event");
  assert.deepEqual(await eventRepository.list(), [event]);
});

test("createEventRecord rejects a published event in the past", async () => {
  const eventRepository = createEventMemory();

  await assert.rejects(
    createEventRecord({
      attributes: { ...validEvent, startsAt: "2026-08-10T10:00:00+08:00" },
      eventRepository,
      createId: () => "past-event",
      now: new Date("2026-09-12T00:00:00+08:00"),
    }),
    (error) =>
      error instanceof EventValidationError &&
      error.errors.startsAt === "A published event must be scheduled in the future.",
  );
});

test("updateEventRecord protects capacity already used by registrations", async () => {
  const event = createEvent(validEvent);
  const eventRepository = createEventMemory([event]);
  const registrationRepository = createRegistrationMemory([
    { eventId: event.id, status: "confirmed" },
    { eventId: event.id, status: "confirmed" },
  ]);

  await assert.rejects(
    updateEventRecord({
      id: event.id,
      attributes: { ...validEvent, capacity: 1 },
      eventRepository,
      registrationRepository,
      now: new Date("2026-09-12T00:00:00+08:00"),
    }),
    (error) =>
      error instanceof EventValidationError &&
      error.errors.capacity === "Capacity cannot be lower than 2.",
  );
});

test("updateEventRecord stores a valid event edit", async () => {
  const event = createEvent(validEvent);
  const eventRepository = createEventMemory([event]);
  const registrationRepository = createRegistrationMemory();

  const updatedEvent = await updateEventRecord({
    id: event.id,
    attributes: { ...validEvent, title: "Updated Event" },
    eventRepository,
    registrationRepository,
    now: new Date("2026-09-12T00:00:00+08:00"),
  });

  assert.equal(updatedEvent.title, "Updated Event");
  assert.equal((await eventRepository.list())[0].title, "Updated Event");
});
