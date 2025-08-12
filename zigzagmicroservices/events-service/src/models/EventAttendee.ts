// models/EventAttendee.ts
import { DataTypes, Model, InferAttributes, InferCreationAttributes,CreationOptional } from "sequelize";
import sequelize from "../config/database";

export class EventAttendee extends Model<
  InferAttributes<EventAttendee>,
  InferCreationAttributes<EventAttendee>
> {
  declare id: CreationOptional<number>;   // <-- not required when creating
  declare eventId: number;     // FK to local events table
  declare userId: string;      // from auth token; no cross‑service FK
  declare userName?: string | null;   // optional denormalized snapshot
  declare userAvatarUrl?: string | null; // optional
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

EventAttendee.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "events", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    userId: {
      type: DataTypes.STRING, // keep STRING to support UUIDs or snowflakes across services
      allowNull: false,
    },
    userName: { type: DataTypes.STRING, allowNull: true },
    userAvatarUrl: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "event_attendees",
    indexes: [
      { unique: true, fields: ["eventId", "userId"] },
      { fields: ["userId"] },
    ],
  }
);

export default EventAttendee;