CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"jobTitle" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
