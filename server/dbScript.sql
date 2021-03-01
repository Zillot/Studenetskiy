create table "responses" (
	id SERIAL PRIMARY KEY,
	photo text NOT NULL,
	name VARCHAR(100) NOT NULL,
	text VARCHAR(200) NOT NULL
);
