'use server'

import { db } from "@/drizzel/db";
import { meetingActionSchema } from "@/schema/meetings";
import { fromZonedTime } from "date-fns-tz";
import { getValidTimesFromSchedule } from "./schedule";
import { createCalendarEvent } from "../google/googleCalendar";
import { z } from "zod";

//Server action to create a meeting
export async function createMeeting(
  unsafeData: z.infer<typeof meetingActionSchema> // Incoming data, inferred from the meetingActionSchema
) {


  try {
    // Validate the incoming data against the schema
    const { success, data } = meetingActionSchema.safeParse(unsafeData);
    if (success) {
      console.log(
        `createMeeting payload: startTime=${data.startTime.toISOString()} timezone=${data.timezone} eventId=${data.eventId} clerkUserId=${data.clerkUserId}`
      )
    }

    // If validation fails, throw an error
    if (!success) {
      throw new Error("Invalid data.");
    }

    // Try to find the event in the database that matches the provided IDs and is active
    const event = await db.query.EventTable.findFirst({
      where: ({ clerkUserId, isActive, id }, { eq, and }) =>
        and(
          eq(isActive, true), // Event must be active
          eq(clerkUserId, data.clerkUserId), // Belonging to the right user
          eq(id, data.eventId) // Matching the event ID
        ),
    });

    // If no matching event is found, throw an error
    if (!event) {
      throw new Error("Event not found.");
    }

  // Treat the incoming startTime as the exact UTC instant selected by the client
  // The client will submit the UTC value; avoid re-interpreting it in another timezone
  const startUtc = data.startTime;

  // Check if the selected time is valid for the event's availability
  const validTimes = await getValidTimesFromSchedule([startUtc], event);

    // If the selected time is not valid, throw an error
    if (validTimes.length === 0) {
      // Log the invalid time for debugging purposes
      console.error(`Validation failed for time: ${startUtc.toISOString()} in timezone: ${data.timezone}`);
      throw new Error("Selected time is not valid.");
    }

    // Create the Google Calendar event with all necessary details
    await createCalendarEvent({
      ...data, // guest info, timezone, etc.
      startTime: startUtc, // already an exact UTC instant
      duration: event.duration, // use duration from the event
      eventName: event.name, // use event name from DB
    });
    return {clerkUserId: data.clerkUserId, eventId : data.eventId, startTime: data.startTime}
  } catch (error: any) {
    // Log the error message (or handle it based on your need)
    console.error(`Error creating meeting: ${error.message || error}`);
    // Optionally throw the error to be handled further upstream
    throw new Error(`Failed to create meeting: ${error.message || error}`);
  }
}