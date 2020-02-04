select p.*, m.mealId, m.mealType
from pets as p
join meals as m
join mealContents as mc
on p.mealId = m.mealId;
order by p.start

select u.*
from users as u
where 'key' = 'value';

insert into users 
(username, password, phone) values ('username', 'password', 'phone');

select first u.userId, u.username
from users as u
where u.userId = 'userId'