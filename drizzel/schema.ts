
import { pgTable, uuid,  integer, text, boolean, timestamp, index } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at").notNull().defaultNow();
const updatedAt = timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date());
export const events = pgTable("events", {
   id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    duration: integer("duration").notNull(), // duration in minutes
    clerkUserId: boolean("clerk_user_id").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt,
    updatedAt,
   
    
},
 table => ([
        index("clerkUserIdIndex").on(table.clerkUserId),
    ])
    ,);
    export const schedules = pgTable("schedules", {
        id: uuid("id").primaryKey().defaultRandom(),
        clerkUserId: text("clerk_user_id").notNull(),
        timezone: text("timezone").notNull(),
        createdAt,
        updatedAt,
    }, );
    export const scheduleAvailabilities = pgTable("schedule_availabilities", {
        id: uuid("id").primaryKey().defaultRandom(),
        scheduleId: uuid("schedule_id").notNull().references(() => schedules.id , { onDelete: 'cascade' }),
        dayOfWeek: integer("day_of_week").notNull(), // 0 = Sunday, 6 = Saturday
        startTime: text("start_time").notNull(), // e.g., "09:00"
        endTime: text("end_time").notNull(),   // e.g., "17:00"
        createdAt,
        updatedAt,
    });