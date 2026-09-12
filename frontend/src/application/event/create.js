import {
  createEvent,
  EventValidationError,
  validatePublication,
} from "../../domain/event/index.js";

export async function createEventRecord({
  attributes,
  eventRepository,
  createId,
  now = new Date(),
}) {
  const event = createEvent({ ...attributes, id: createId() });
  const errors = validatePublication(event, now);

  if (Object.keys(errors).length > 0) {
    throw new EventValidationError(errors);
  }

  return eventRepository.create(event);
}
