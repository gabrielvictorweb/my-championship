#!/bin/bash

composer install
php artisan migrate --force
chmod o+w ./storage/ -R
