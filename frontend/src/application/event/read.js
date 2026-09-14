async function summarizeEvent(event, registrationRepository) {
  const [registrationCount, registrationRecordCount] = await Promise.all([
    registrationRepository.countByEvent(event.id),
    registrationRepository.countAllByEvent(event.id),
  ]);

  return Object.freeze({
    ...event,
    registrationCount,
    registrationRecordCount,
    remainingCapacity: Math.max(event.capacity - registrationCount, 0),
  });
}

export async function readEvent({
  id,
  eventRepository,
  registrationRepository,
}) {
  const event = await eventRepository.find(id);

  return event ? summarizeEvent(event, registrationRepository) : null;
}

export async function readEvents({ eventRepository, registrationRepository }) {
  const events = await eventRepository.list();
  const summaries = await Promise.all(
    events.map((event) => summarizeEvent(event, registrationRepository)),
  );

  return summaries.sort(
    (first, second) => Date.parse(first.startsAt) - Date.parse(second.startsAt),
  );
}

export async function readOpenEvents({
  eventRepository,
  registrationRepository,
  now = new Date(),
}) {
  const events = await readEvents({ eventRepository, registrationRepository });

  return events.filter(
    (event) =>
      event.status === "published" &&
      Date.parse(event.startsAt) > now.getTime() &&
      event.remainingCapacity > 0,
  );
}
