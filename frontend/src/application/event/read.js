export async function readEvents({ eventRepository, registrationRepository }) {
  const events = await eventRepository.list();
  const summaries = await Promise.all(
    events.map(async (event) => {
      const registrationCount = await registrationRepository.countByEvent(event.id);

      return Object.freeze({
        ...event,
        registrationCount,
        remainingCapacity: Math.max(event.capacity - registrationCount, 0),
      });
    }),
  );

  return summaries.sort(
    (first, second) => Date.parse(first.startsAt) - Date.parse(second.startsAt),
  );
}
