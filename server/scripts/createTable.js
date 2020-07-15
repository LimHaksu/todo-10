import dotenv from "dotenv";
import path from "path";
import mysql from "mysql2";

dotenv.config({ path: path.join(__dirname, "../.env") });

const queries = [
  `create table user(
    id int not null,
    password varchar(100) not null,
    username varchar(20) not null,

    constraint user_pk primary key (id)
);`,
  `create table todo_column(
    id int not null,
    idx int not null,
    title varchar(100) not null,
    user_id int not null,
    prev_column_id int,
    created_at timestamp default now(),
    updated_at timestamp default now() on update now(),	

    constraint column_pk primary key (id),
    constraint column_fk foreign key (user_id) references user(id) on delete cascade on update cascade
);`,
  `create table todo(
	id int not null,
	user_id int not null,
	column_id int not null,
	prev_todo_id int,
	content varchar(1000) not null,
	created_at timestamp default now(),
	updated_at timestamp default now() on update now(),

	constraint todo_pk primary key (id),
	constraint todo_fk foreign key (column_id) references todo_column(id) on delete cascade on update cascade
);`,
  `create table log(
    id int not null,
    user_id int not null,
    action_type varchar(6) not null,
    todo_id int,
    todo_content varchar(1000),
    column_content varchar(100),
    prev_column_content varchar(100),
    created_at timestamp default now(),

    constraint log_pk primary key (id),
    constraint log_fk foreign key (user_id) references user(id) on delete cascade on update cascade
);`,
];

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const sendQuery = (con, query, resolve) => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(query, function (err, result) {
      if (err) throw err;
      console.log("Table created");
      resolve();
    });
  });
};

Promise.all(
  queries.map(
    (query) =>
      new Promise((resolve, reject) => {
        sendQuery(con, query, resolve);
      })
  )
).then(() => {
  con.close();
});
