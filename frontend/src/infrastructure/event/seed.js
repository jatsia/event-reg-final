import { createEvent } from "../../domain/event/index.js";

export function createEventSeed() {
  return [
    createEvent({
      id: "community-design-meetup",
      title: "Community Design Meetup",
      description: "A practical afternoon for sharing interface work and feedback.",
      startsAt: "2026-10-18T14:00:00+08:00",
      timeZone: "Asia/Manila",
      venue: "The Workshop, Makati",
      capacity: 80,
      status: "published",
    }),
    createEvent({
      id: "frontend-study-session",
      title: "Frontend Study Session",
      description: "A guided study session covering browser fundamentals.",
      startsAt: "2026-11-07T10:00:00+08:00",
      timeZone: "Asia/Manila",
      venue: "Online",
      capacity: 40,
      status: "draft",
    }),
  ];
}
