# storybook casino

```
npm install
```

## для запуска сервера storybook
```
npm run storybook 
```

## опубликовать пакеты 
*для каждой сессии давать доступ командой в терминале "Set-ExecutionPolicy RemoteSigned -Scope Process"
```
lerna publish
```       

## если не было изменений но нужно опубликовать?
```lerna publish from-package```
  


## В корневом package.json workspaces - путь к компонентам-пакетам, поддерживать в актуальном виде

```
"workspaces": [
    "src/components/*/**",
    "src/store/modules/*/**",
    "src/utils/*/**"
]
```



## Добавлять в проект в /store/module/index.js

## не запускать, но нужны были для инициализации
``` npx storybook init ``` 

``` npx lerna@latest init ```
