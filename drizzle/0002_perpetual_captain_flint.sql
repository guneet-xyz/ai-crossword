ALTER TABLE "crossword_session_grid" ALTER COLUMN "letter" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "crossword_word" ALTER COLUMN "row" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "crossword_word" ALTER COLUMN "col" SET NOT NULL;