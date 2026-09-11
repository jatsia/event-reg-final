const DEFAULT_ROUTE = "events";
const ROUTES = new Set(["events", "registrations", "register"]);

function getRoute() {
  const requestedRoute = window.location.hash.slice(1);

  return ROUTES.has(requestedRoute) ? requestedRoute : DEFAULT_ROUTE;
}

function renderRoute(route) {
  document.querySelectorAll("[data-view]").forEach((view) => {
    view.hidden = view.dataset.view !== route;
  });

  document.querySelectorAll("[data-route]").forEach((link) => {
    if (link.dataset.route === route) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const heading = document.querySelector(`[data-view="${route}"] h1`);
  document.title = `${heading.textContent} | Event Registry`;
}

export function initializeNavigation() {
  const renderCurrentRoute = () => renderRoute(getRoute());

  window.addEventListener("hashchange", renderCurrentRoute);
  renderCurrentRoute();
}
