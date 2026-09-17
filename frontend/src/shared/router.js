import {
  DEFAULT_ROUTE,
  getNavigationRoute,
  renderShell,
  ROUTE_IDS,
} from "./shell.js";

export function resolveRoute(requestedRoute, isReady = true) {
  if (!ROUTE_IDS.includes(requestedRoute)) {
    return DEFAULT_ROUTE;
  }

  return isReady ? requestedRoute : getNavigationRoute(requestedRoute);
}

function getRoute() {
  const requestedRoute = window.location.hash.slice(1);
  const isReady =
    !ROUTE_IDS.includes(requestedRoute) ||
    document.querySelector(`[data-view="${requestedRoute}"]`)?.dataset.ready !==
      "false";

  return resolveRoute(requestedRoute, isReady);
}

function renderRoute(route) {
  const navigationRoute = getNavigationRoute(route);

  renderShell(route);

  document.querySelectorAll("[data-view]").forEach((view) => {
    view.hidden = view.dataset.view !== route;
  });

  document.querySelectorAll("[data-route]").forEach((link) => {
    if (link.dataset.route === navigationRoute) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const heading = document.querySelector(`[data-view="${route}"] h1`);
  document.title = `${heading.textContent} | Event Registry`;
}

export function initializeRouter() {
  const renderCurrentRoute = () => renderRoute(getRoute());

  window.addEventListener("hashchange", renderCurrentRoute);
  renderCurrentRoute();
}
