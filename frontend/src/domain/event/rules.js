export const EVENT_STATUSES = Object.freeze(["draft", "published", "closed"]);

export function validateEvent(event) {
  const errors = {};

  if (!event.id) {
    errors.id = "An event ID is required.";
  }

  if (!event.title) {
    errors.title = "An event title is required.";
  }

  if (!event.description) {
    errors.description = "An event description is required.";
  }

  if (!event.venue) {
    errors.venue = "A venue is required.";
  }

  if (Number.isNaN(Date.parse(event.startsAt))) {
    errors.startsAt = "A valid event schedule is required.";
  }

  if (!Number.isInteger(event.capacity) || event.capacity < 1) {
    errors.capacity = "Capacity must be a positive whole number.";
  }

  if (!EVENT_STATUSES.includes(event.status)) {
    errors.status = "The event status is not supported.";
  }

  return errors;
}
