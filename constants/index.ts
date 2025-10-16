export const DAYS_OF_WEEK_IN_ORDER = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;
export const PrivateNavLinks = [
    {
        imgURL: "/assets/events.svg",
        route: "/events",
        label: "My Events",
    },
    {
        imgURL: "/assets/schedule.svg",
        route: "/schedule",
        label: "My Schedule",
    },
    {
        imgURL: "/assets/public.svg",
        route: "/public",
        label: "Public profile",
    },
] as const;