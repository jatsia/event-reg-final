export class EventRemovalError extends Error {
  constructor(message) {
    super(message);
    this.name = "EventRemovalError";
  }
}

export async function removeEventRecord({
  id,
  eventRepository,
  registrationRepository,
}) {
  const event = await eventRepository.find(id);

  if (!event) {
    throw new EventRemovalError("The event could not be found.");
  }

  const registrationCount = await registrationRepository.countAllByEvent(id);

  if (registrationCount > 0) {
    throw new EventRemovalError(
      "Remove or cancel this event's registrations before removing the event.",
    );
  }

  return eventRepository.remove(id);
}
