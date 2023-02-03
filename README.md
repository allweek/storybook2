# storybook casino

```
npm install
```

## для запуска сервера storybook
```
npm run storybook 
```

## опубликовать пакеты 
Сначала ```npm commit```

```
lerna publish
```       
*для каждой сессии давать доступ командой в терминале "Set-ExecutionPolicy RemoteSigned -Scope Process"

### если не было изменений но нужно опубликовать?
```lerna publish from-package```

## 3 вида пакетов:
* Vue компоненты ``` src/components ```
* Store modules ``` src/store/modules ```
* Utils ``` src/utils ```

### каждый пакет - отдельная папка, в которой должен лежать файл package.json, с указанием его зависимостей:
```
{
  "name": "@alexnsk89/store-gamelist",
  "version": "0.0.13",
  "publishConfig": {
    "access": "public"
  },
  "dependencies": {
    "@alexnsk89/utils-api": "^0.0.4",
    "jsona": "^1.9.3"
  }
}
```



### В корневом package.json workspaces - путь ко всем компонентам-пакетам (package.json)

Универсально:
```
  "workspaces": [
    "src/**"
  ]
```
Old version:
```
"workspaces": [
    "src/components/*/**",
    "src/store/modules/*/**",
    "src/utils/*/**"
]
```



### Добавлять в casino проект в /store/module/index.js файл парсер модулей стор

### не запускать, но нужны были для инициализации
``` npx storybook init ``` 

``` npx lerna@latest init ```
