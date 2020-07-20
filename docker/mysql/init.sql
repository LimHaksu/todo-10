CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL,

    CONSTRAINT user_pk PRIMARY KEY (id)
);
CREATE TABLE todo_column(
    id INT NOT NULL AUTO_INCREMENT,
    idx INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    prev_column_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),	

    CONSTRAINT column_pk PRIMARY KEY (id),
    CONSTRAINT column_fk FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE todo(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	column_id INT NOT NULL,
	prev_todo_id INT,
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
    todo_id INT,
    todo_content VARCHAR(1000),
    column_content VARCHAR(100),
    prev_column_content VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT log_pk PRIMARY KEY (id),
    CONSTRAINT log_fk FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);