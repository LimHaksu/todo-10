CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL,

    CONSTRAINT user_pk PRIMARY KEY (id)
);
INSERT INTO user (id, password, username) VALUES(1, 1234, "Abel");

CREATE TABLE todo_column(
    id INT NOT NULL AUTO_INCREMENT,
    idx INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),	

    CONSTRAINT column_pk PRIMARY KEY (id),
    CONSTRAINT column_fk FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO todo_column (idx, title, user_id) VALUES (1, "Todo", 1);
INSERT INTO todo_column (idx, title, user_id) VALUES (2, "Doing", 1);
INSERT INTO todo_column (idx, title, user_id) VALUES (3, "Done", 1);

CREATE TABLE todo(
	id INT NOT NULL AUTO_INCREMENT,
    idx INT NOT NULL,
	user_id INT NOT NULL,
	column_id INT NOT NULL,
	content VARCHAR(1000) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),

	CONSTRAINT todo_pk PRIMARY KEY (id),
	CONSTRAINT todo_fk FOREIGN KEY (column_id) REFERENCES todo_column(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE log(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    action_type VARCHAR(6) NOT NULL,
    data TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT log_pk PRIMARY KEY (id),
    CONSTRAINT log_fk FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);