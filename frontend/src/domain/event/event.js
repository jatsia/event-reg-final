import { validateEvent } from "./rules.js";

export class EventValidationError extends Error {
  constructor(errors) {
    super("The event is invalid.");
    this.name = "EventValidationError";
    this.errors = errors;
  }
}

export function createEvent(attributes) {
  const event = {
    id: String(attributes.id ?? "").trim(),
    title: String(attributes.title ?? "").trim(),
    description: String(attributes.description ?? "").trim(),
    startsAt: String(attributes.startsAt ?? "").trim(),
    timeZone: String(attributes.timeZone ?? "Asia/Manila").trim(),
    venue: String(attributes.venue ?? "").trim(),
    capacity: Number(attributes.capacity),
    status: String(attributes.status ?? "draft").trim().toLowerCase(),
  };
  const errors = validateEvent(event);

  if (Object.keys(errors).length > 0) {
    throw new EventValidationError(errors);
  }

  return Object.freeze(event);
}
