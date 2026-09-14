import { createElement } from "./dom.js";
import { createIcon } from "./icons.js";

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

export const ROUTE_IDS = Object.freeze([
  ...NAVIGATION_GROUPS.flatMap((group) =>
    group.routes.map((route) => route.id),
  ),
  "detail",
  "editor",
  "form",
  "confirmation",
]);

export function getNavigationRoute(route) {
  if (["detail", "editor"].includes(route)) {
    return "events";
  }

  return ["form", "confirmation"].includes(route) ? "register" : route;
}

function createNavigationLink(route) {
  const link = createElement("a", "navigation-link");

  link.href = `#${route.id}`;
  link.dataset.route = route.id;
  link.append(createIcon(route.icon), createElement("span", "", route.label));

  return link;
}

function createNavigationGroup(group) {
  const container = createElement("div", "navigation-group");
  const label = createElement("p", "navigation-label", group.label);

  container.append(label, ...group.routes.map(createNavigationLink));
  return container;
}

function createNavigation() {
  const navigation = createElement("nav", "navigation");

  navigation.setAttribute("aria-label", "Primary navigation");
  navigation.append(...NAVIGATION_GROUPS.map(createNavigationGroup));

  return navigation;
}

function createBrand() {
  const brand = createElement("a", "brand");
  const mark = createElement("span", "brand-mark");

  brand.href = "#events";
  brand.setAttribute("aria-label", "Event Registry home");
  mark.setAttribute("aria-hidden", "true");
  brand.append(mark, createElement("span", "brand-name", "Event Registry"));

  return brand;
}

export function initializeSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");

  if (!sidebar) {
    return;
  }

  sidebar.replaceChildren(
    createBrand(),
    createNavigation(),
    createElement("p", "environment-note", "Sample data - resets on refresh"),
  );
}
