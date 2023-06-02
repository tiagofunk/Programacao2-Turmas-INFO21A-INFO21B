drop user usuarioNode;
create user usuarioNode@"%" identified by "Abcd&1234";
grant all on bancoNode.* to usuarioNode@"%";

show tables;
show index from pessoas;
select * from pessoas;

drop database bancoNode;
create database bancoNode;
use bancoNode;
create table pessoas(
 id int auto_increment primary key,
 nome varchar(30),
 idade int
 );
 describe pessoas;
 insert into pessoas values (default,"tiago",19,"2023-06-01","2023-06-01");
drop table pessoas;