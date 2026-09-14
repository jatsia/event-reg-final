export function createRegistrationMemory(initialRegistrations = []) {
  const registrations = new Map(
    initialRegistrations.map((registration, index) => [
      registration.id ?? `initial-${index}`,
      registration,
    ]),
  );

  return Object.freeze({
    async create(registration) {
      if (registrations.has(registration.id)) {
        throw new Error("A registration with this ID already exists.");
      }

      registrations.set(registration.id, registration);
      return registration;
    },

    async countAllByEvent(eventId) {
      return Array.from(registrations.values()).filter(
        (registration) => registration.eventId === eventId,
      ).length;
    },

    async countByEvent(eventId) {
      return Array.from(registrations.values()).filter(
        (registration) =>
          registration.eventId === eventId && registration.status !== "canceled",
      ).length;
    },

    async find(id) {
      return registrations.get(id) ?? null;
    },

    async list() {
      return Array.from(registrations.values());
    },

    async update(registration) {
      if (!registrations.has(registration.id)) {
        throw new Error("The registration could not be found.");
      }

      registrations.set(registration.id, registration);
      return registration;
    },

    async remove(id) {
      const registration = registrations.get(id);

      if (!registration) {
        throw new Error("The registration could not be found.");
      }

      registrations.delete(id);
      return registration;
    },
  });
}
