import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_ROUTE,
  NAVIGATION_GROUPS,
  ROUTE_IDS,
} from "../src/presentation/components/routes.js";

test("navigation routes are unique and include the default route", () => {
  assert.equal(new Set(ROUTE_IDS).size, ROUTE_IDS.length);
  assert.equal(ROUTE_IDS.includes(DEFAULT_ROUTE), true);
});

test("every navigation route provides its label and icon", () => {
  NAVIGATION_GROUPS.flatMap((group) => group.routes).forEach((route) => {
    assert.ok(route.label);
    assert.ok(route.icon);
  });
});
