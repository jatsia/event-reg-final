export async function removeRegistrationRecord({
  id,
  registrationRepository,
}) {
  const registration = await registrationRepository.find(id);

  if (!registration) {
    throw new Error("The registration could not be found.");
  }

  if (registration.status !== "canceled") {
    throw new Error("Cancel the registration before removing its record.");
  }

  return registrationRepository.remove(id);
}
