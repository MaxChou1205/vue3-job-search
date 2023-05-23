import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    // screen.debug();
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });
});
