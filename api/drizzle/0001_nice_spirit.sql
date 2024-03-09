CREATE TABLE `request` (
	`id` text PRIMARY KEY NOT NULL,
	`requested_by` text NOT NULL,
	`upload_id` text NOT NULL,
	`created_at` integer
);
