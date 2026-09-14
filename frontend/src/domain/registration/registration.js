import { validateRegistration } from "./validator.js";

export class RegistrationValidationError extends Error {
  constructor(errors) {
    super("The registration is invalid.");
    this.name = "RegistrationValidationError";
    this.errors = errors;
  }
}

export function createRegistration(attributes) {
  const registration = {
    id: String(attributes.id ?? "").trim(),
    eventId: String(attributes.eventId ?? "").trim(),
    attendeeName: String(attributes.attendeeName ?? "").trim(),
    email: String(attributes.email ?? "").trim().toLowerCase(),
    status: String(attributes.status ?? "confirmed").trim().toLowerCase(),
    createdAt: String(attributes.createdAt ?? "").trim(),
  };
  const errors = validateRegistration(registration);

  if (Object.keys(errors).length > 0) {
    throw new RegistrationValidationError(errors);
  }

  return Object.freeze(registration);
}
