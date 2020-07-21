const sendQueries = require("./sendQueries");

const queries = [
  `create table user(
    id int not null AUTO_INCREMENT,
    password varchar(100) not null,
    username varchar(20) not null,

    constraint user_pk primary key (id)
);`,
  `create table todo_column(
    id int not null AUTO_INCREMENT,
    idx int not null,
    title varchar(100) not null,
    user_id int not null,
    created_at timestamp default now(),
    updated_at timestamp default now() on update now(),	

    constraint column_pk primary key (id),
    constraint column_fk foreign key (user_id) references user(id) on delete cascade on update cascade
);`,
  `create table todo(
	id int not null AUTO_INCREMENT,
  idx int not null,
	user_id int not null,
	column_id int not null,
	content varchar(1000) not null,
	created_at timestamp default now(),
	updated_at timestamp default now() on update now(),

	constraint todo_pk primary key (id),
	constraint todo_fk foreign key (column_id) references todo_column(id) on delete cascade on update cascade
);`,
  `create table log(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    action_type varchar(6) not null,
    data text not null,
    created_at timestamp default now(),

    constraint log_pk primary key (id),
    constraint log_fk foreign key (user_id) references user(id) on delete cascade on update cascade
);`,
];

sendQueries(queries);
