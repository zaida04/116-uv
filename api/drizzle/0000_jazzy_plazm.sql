CREATE TABLE `request` (
	`id` text PRIMARY KEY NOT NULL,
	`requested_by` text NOT NULL,
	`upload_id` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL
);
