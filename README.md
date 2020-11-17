# Тестовое задание EKF Frontend-разработчик

## Сделать на nuxt.js или vue.js список товаров с ценами и форму редактирования товара

Требования:

1. Список товаров это простая <table> и должна включать поля - наименование (поле name), артикул (поле vendor_code), серия (поле series), цена (поле price), поле с кнопкой редактирования товара которая будет вызывать форму редактирования (можно модальную) в которой можно будет отредактировать наименование и артикул.
2. Цену в списке товаров отформатировать без копеек
3. Товаров в базе данных очень много, поэтому нужно сделать постраничный вывод в таблице (например, отображать по 40 товаров за раз)
4. Сделать используя graphql api - https://sweet-hedgehog-55.hasura.app/v1/graphql
4. Внешний вид - не принципиально, можно использовать bootstrap 4

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Результат
Смотрите на [https://perfektion.github.io/ekf/](https://perfektion.github.io/ekf/).
