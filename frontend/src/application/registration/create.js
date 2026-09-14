import { createRegistration } from "../../domain/registration/index.js";

export class RegistrationConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "RegistrationConflictError";
  }
}

export async function createRegistrationRecord({
  eventId,
  attributes,
  eventRepository,
  registrationRepository,
  createId,
  now = new Date(),
}) {
  const registration = createRegistration({
    ...attributes,
    id: createId(),
    eventId,
    status: "confirmed",
    createdAt: now.toISOString(),
  });
  const event = await eventRepository.find(eventId);

  if (!event || event.status !== "published") {
    throw new RegistrationConflictError(
      "This event is not currently open for registration.",
    );
  }

  if (Date.parse(event.startsAt) <= now.getTime()) {
    throw new RegistrationConflictError("Registration has closed for this event.");
  }

  const registrationCount = await registrationRepository.countByEvent(eventId);

  if (registrationCount >= event.capacity) {
    throw new RegistrationConflictError("This event has reached capacity.");
  }

  return registrationRepository.create(registration);
}
