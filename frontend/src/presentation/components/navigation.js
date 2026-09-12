import { createElement } from "./element.js";
import { createIcon } from "./icons.js";
import { NAVIGATION_GROUPS } from "./routes.js";

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

export function createNavigation() {
  const navigation = createElement("nav", "navigation");

  navigation.setAttribute("aria-label", "Primary navigation");
  navigation.append(...NAVIGATION_GROUPS.map(createNavigationGroup));

  return navigation;
}
