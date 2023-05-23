import { cleanup } from "@testing-library/vue";
import Matcher from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";

expect.extend(Matcher);

afterEach(() => {
  cleanup();
});
