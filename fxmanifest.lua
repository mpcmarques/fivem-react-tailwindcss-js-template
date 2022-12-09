fx_version 'cerulean'

games {"gta5"}

author "Codex <mateus@codexfactory.com.br>"
description "Phone Module"
version '1.0.0'

lua54 'yes'

ui_page 'web/build/index.html'

client_script "client/**/*"
server_scripts {'@oxmysql/lib/MySQL.ts', "server/**/*"}

files {'web/build/index.html', 'web/build/**/*'}
