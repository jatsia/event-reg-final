export async function readRegistrations({
  eventRepository,
  registrationRepository,
}) {
  const registrations = await registrationRepository.list();

  const records = await Promise.all(
    registrations.map(async (registration) => {
      const event = await eventRepository.find(registration.eventId);

      return Object.freeze({
        ...registration,
        eventTitle: event?.title ?? "Unavailable event",
      });
    }),
  );

  return records.sort(
    (first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt),
  );
}
