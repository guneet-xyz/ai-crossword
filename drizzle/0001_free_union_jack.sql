CREATE TYPE "public"."crossword_word_orientation" AS ENUM('across', 'down');--> statement-breakpoint
CREATE TABLE "crossword_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"crossword_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crossword_session_grid" (
	"session_id" uuid NOT NULL,
	"row" integer NOT NULL,
	"col" integer NOT NULL,
	"letter" char(1) NOT NULL,
	CONSTRAINT "crossword_session_grid_session_id_row_col_pk" PRIMARY KEY("session_id","row","col")
);
--> statement-breakpoint
CREATE TABLE "crossword_word" (
	"crossword_id" uuid NOT NULL,
	"orientation" "crossword_word_orientation",
	"row" integer,
	"col" integer,
	"word" varchar(255) NOT NULL,
	"clue" text NOT NULL,
	CONSTRAINT "crossword_word_crossword_id_word_pk" PRIMARY KEY("crossword_id","word")
);
--> statement-breakpoint
CREATE TABLE "crossword" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"generate_by_user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "crossword_session" ADD CONSTRAINT "crossword_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crossword_session" ADD CONSTRAINT "crossword_session_crossword_id_crossword_id_fk" FOREIGN KEY ("crossword_id") REFERENCES "public"."crossword"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crossword_session_grid" ADD CONSTRAINT "crossword_session_grid_session_id_crossword_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."crossword_session"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crossword_word" ADD CONSTRAINT "crossword_word_crossword_id_crossword_id_fk" FOREIGN KEY ("crossword_id") REFERENCES "public"."crossword"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crossword" ADD CONSTRAINT "crossword_generate_by_user_id_user_id_fk" FOREIGN KEY ("generate_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "crossword_session_grid_session_id_idx" ON "crossword_session_grid" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "crossword_word_crossword_id_idx" ON "crossword_word" USING btree ("crossword_id");