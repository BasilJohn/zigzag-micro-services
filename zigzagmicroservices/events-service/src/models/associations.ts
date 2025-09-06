// models/associations.ts
import Event from "./Events";
import EventAttendee from "./EventAttendee";

// Event 1—* EventAttendee
Event.hasMany(EventAttendee, {
  foreignKey: "eventId",
  as: "attendees",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

EventAttendee.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});

export { Event, EventAttendee };