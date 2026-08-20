import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  ref: text("ref").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  city: text("city").notNull().default("Sebring"),
  service: text("service").notNull(),
  date: text("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  urgency: text("urgency").notNull().default("standard"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  ref: text("ref").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address"),
  propertyType: text("property_type"),
  service: text("service").notNull(),
  description: text("description").notNull(),
  budget: text("budget"),
  timeline: text("timeline"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
