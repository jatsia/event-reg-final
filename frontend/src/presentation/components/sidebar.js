import { createElement } from "./element.js";
import { createNavigation } from "./navigation.js";

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
