<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <job-filters-sidebar-prompt />

      <collapsible-accordion header="Degrees">
        <job-filters-sidebar-checkbox-group
          header="Degrees"
          :unique-values="UNIQUE_DEGREES"
          :action="userStore.ADD_SELECTED_DEGREES"
        />
      </collapsible-accordion>

      <collapsible-accordion header="Job Types">
        <job-filters-sidebar-checkbox-group
          header="Job Types"
          :unique-values="UNIQUE_JOB_TYPES"
          :action="userStore.ADD_SELECTED_JOB_TYPES"
        />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filters-sidebar-checkbox-group
          header="Organizations"
          :unique-values="UNIQUE_ORGANIZATIONS"
          :action="userStore.ADD_SELECTED_ORGANIZATIONS"
        />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { useDegreesStore } from "@/stores/degrees";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";

const jobsStore = useJobsStore();
const userStore = useUserStore();
const degreesStore = useDegreesStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);
</script>
