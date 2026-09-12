export function createEventMemory(initialEvents = []) {
  const events = new Map(initialEvents.map((event) => [event.id, event]));

  return Object.freeze({
    async list() {
      return Array.from(events.values());
    },
  });
}
