#!/bin/bash

# Скрипт для восстановления базы данных из дампа при первом запуске контейнера

if [ -f "/docker-entrypoint-initdb.d/cookiefest_backup.dump" ]; then
    echo "Восстановление базы данных из дампа..."
    pg_restore -U postgres -d postgres /docker-entrypoint-initdb.d/cookiefest_backup.dump
else
    echo "Дамп базы данных не найден. Пропуск восстановления."
fi
