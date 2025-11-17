export const DAYS_OF_WEEK_IN_ORDER = [
    
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;
export const PrivateNavLinks = [
  { imgURL: "/assets/events.svg", route: "/events", labelKey: "nav.events" },
  { imgURL: "/assets/schedule.svg", route: "/schedule", labelKey: "nav.schedule" },
  { imgURL: "/assets/public.svg", route: "/book", labelKey: "nav.publicProfile" }
] as const;