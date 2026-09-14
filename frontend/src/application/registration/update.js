export async function cancelRegistrationRecord({
  id,
  registrationRepository,
}) {
  const registration = await registrationRepository.find(id);

  if (!registration) {
    throw new Error("The registration could not be found.");
  }

  if (registration.status === "canceled") {
    return registration;
  }

  return registrationRepository.update(
    Object.freeze({ ...registration, status: "canceled" }),
  );
}
