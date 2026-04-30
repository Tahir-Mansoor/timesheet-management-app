export type Timesheet = {
  id: number;
  week: number;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
};