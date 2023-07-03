import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";

import { useRoute } from "vue-router";
vi.mock("vue-router");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderJobListings = (routeParams) => {
    const pinia = createTestingPinia();
    const route = useRoute.mockReturnValue(routeParams);
    const jobsStore = useJobsStore();
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { route, jobsStore };
  };

  it("fetches jobs", () => {
    const routeParams = createRoute();

    const { jobsStore } = renderJobListings(routeParams);

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    const queryParams = { page: "1" };
    const routeParams = createRoute(queryParams);

    const { jobsStore } = renderJobListings(routeParams);
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const routeParams = createRoute(queryParams);

      renderJobListings(routeParams);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "3" };
      const routeParams = createRoute(queryParams);

      renderJobListings(routeParams);

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      const queryParams = { page: "1" };
      const routeParams = createRoute(queryParams);

      const { jobsStore } = renderJobListings(routeParams);
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      const queryParams = { page: "1" };
      const routeParams = createRoute(queryParams);

      const { jobsStore } = renderJobListings(routeParams);
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      const queryParams = { page: "2" };
      const routeParams = createRoute(queryParams);

      const { jobsStore } = renderJobListings(routeParams);
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to previous page", async () => {
      const queryParams = { page: "2" };
      const routeParams = createRoute(queryParams);

      const { jobsStore } = renderJobListings(routeParams);
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
