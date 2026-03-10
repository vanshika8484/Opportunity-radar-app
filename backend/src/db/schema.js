import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const favorites=pgTable("favorites",{
    id:serial("id").primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull(),
     jobTitle:text("jobTitle").notNull(),
     jobUrl: text("job_url"),
     company: text("company"),
location: text("location"),
    createdAt:timestamp("created_at").defaultNow()
})