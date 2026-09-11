import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ReportDateRange = {
  startDate: string;
  endDate: string;
};

interface ReportFilters {
  dateRange: ReportDateRange;
  department: string;
  employeeId: number | null;
}

interface ReportConfiguration {
  reportType: "employee" | "department";
  viewMode: "table" | "summary";
}

interface ReportUIState {
  isFilterOpen: boolean;
}

interface ReportState {
  filters: ReportFilters;
  configuration: ReportConfiguration;
  ui: ReportUIState;
}

const initialState: ReportState = {
  filters: {
    dateRange: {
      startDate: "",
      endDate: "",
    },

    department: "",

    employeeId: null,
  },

  configuration: {
    reportType: "employee",
    viewMode: "table",
  },

  ui: {
    isFilterOpen: true,
  },
};

const reportSlice = createSlice({
  name: "report",

  initialState,

  reducers: {
    setStartDate(
      state,
      action: PayloadAction<string>
    ) {
      state.filters.dateRange.startDate =
        action.payload;
    },

    setEndDate(
      state,
      action: PayloadAction<string>
    ) {
      state.filters.dateRange.endDate =
        action.payload;
    },

    setDepartment(
      state,
      action: PayloadAction<string>
    ) {
      state.filters.department =
        action.payload;
    },

    setEmployee(
      state,
      action: PayloadAction<number | null>
    ) {
      state.filters.employeeId =
        action.payload;
    },

    setReportType(
      state,
      action: PayloadAction<
        "employee" | "department"
      >
    ) {
      state.configuration.reportType =
        action.payload;
    },

    setViewMode(
      state,
      action: PayloadAction<
        "table" | "summary"
      >
    ) {
      state.configuration.viewMode =
        action.payload;
    },

    toggleFilter(
      state
    ) {
      state.ui.isFilterOpen =
        !state.ui.isFilterOpen;
    },

    resetFilters(
      state
    ) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setDepartment,
  setEmployee,
  setReportType,
  setViewMode,
  toggleFilter,
  resetFilters,
} = reportSlice.actions;

export default reportSlice.reducer;