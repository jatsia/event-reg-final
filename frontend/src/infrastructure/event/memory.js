export function createEventMemory(initialEvents = []) {
  const events = new Map(initialEvents.map((event) => [event.id, event]));

  return Object.freeze({
    async create(event) {
      if (events.has(event.id)) {
        throw new Error("An event with this ID already exists.");
      }

      events.set(event.id, event);
      return event;
    },

    async list() {
      return Array.from(events.values());
    },

    async update(event) {
      if (!events.has(event.id)) {
        throw new Error("The event could not be found.");
      }

      events.set(event.id, event);
      return event;
    },
  });
}
