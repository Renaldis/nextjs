CREATE TABLE "links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"created_at" "cal::local_datetime" DEFAULT now(),
	"updated_at" "cal::local_datetime" DEFAULT now(),
	"deleted_at" "cal::local_datetime"
);
