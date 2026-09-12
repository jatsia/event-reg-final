export function createRegistrationMemory(initialRegistrations = []) {
  const registrations = [...initialRegistrations];

  return Object.freeze({
    async countByEvent(eventId) {
      return registrations.filter(
        (registration) =>
          registration.eventId === eventId && registration.status !== "canceled",
      ).length;
    },
  });
}
