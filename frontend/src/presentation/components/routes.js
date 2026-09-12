export const DEFAULT_ROUTE = "events";

export const NAVIGATION_GROUPS = Object.freeze([
  Object.freeze({
    label: "Manage",
    routes: Object.freeze([
      Object.freeze({ id: "events", label: "Events", icon: "events" }),
      Object.freeze({
        id: "registrations",
        label: "Registrations",
        icon: "registrations",
      }),
    ]),
  }),
  Object.freeze({
    label: "Public",
    routes: Object.freeze([
      Object.freeze({
        id: "register",
        label: "Registration page",
        icon: "public",
      }),
    ]),
  }),
]);

export const ROUTE_IDS = Object.freeze(
  [
    ...NAVIGATION_GROUPS.flatMap((group) => group.routes.map((route) => route.id)),
    "editor",
  ],
);

export function getNavigationRoute(route) {
  return route === "editor" ? "events" : route;
}
