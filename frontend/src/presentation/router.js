import {
  DEFAULT_ROUTE,
  getNavigationRoute,
  ROUTE_IDS,
} from "./components/routes.js";

function getRoute() {
  const requestedRoute = window.location.hash.slice(1);

  return ROUTE_IDS.includes(requestedRoute) ? requestedRoute : DEFAULT_ROUTE;
}

function renderRoute(route) {
  const navigationRoute = getNavigationRoute(route);

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
