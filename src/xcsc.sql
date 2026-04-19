-- создадим временную таблицу где ,будут храниться все клиенты у которых в данном restaurant  заказов < 2 
WITH repeat_clients AS (
    SELECT restaurant, cust_id
    FROM orders
    WHERE status = 'completed'      
    GROUP BY restaurant, cust_id     
    HAVING COUNT(*) >= 2             -- берём только повторных клиентов
),

--  вторая временная таблица где храним общее количество заказв для ресторана 
completed_orders AS (
    SELECT restaurant, COUNT(*) AS total_completed
    FROM orders
    WHERE status = 'completed'      -- учитываем только завершённые заказы
    GROUP BY restaurant
)

-- ресторан с максимальным числом повторных клиентов
SELECT r.restaurant
FROM repeat_clients r
JOIN completed_orders c ON r.restaurant = c.restaurant   -- объединяем инфу 
GROUP BY r.restaurant, c.total_completed
ORDER BY 
    COUNT(r.cust_id) DESC,   -- сортировка по числу повторных клиентов
    c.total_completed DESC,     
    r.restaurant ASC            --при новом равенстве сортируем по алфавиту
LIMIT 1;                      --берем один ресторан