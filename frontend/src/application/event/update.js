import {
  createEvent,
  EventValidationError,
  validatePublication,
} from "../../domain/event/index.js";

export async function updateEventRecord({
  id,
  attributes,
  eventRepository,
  registrationRepository,
  now = new Date(),
}) {
  const event = createEvent({ ...attributes, id });
  const errors = validatePublication(event, now);
  const registrationCount = await registrationRepository.countByEvent(id);

  if (event.capacity < registrationCount) {
    errors.capacity = `Capacity cannot be lower than ${registrationCount}.`;
  }

  if (Object.keys(errors).length > 0) {
    throw new EventValidationError(errors);
  }

  return eventRepository.update(event);
}
