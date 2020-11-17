<template>
  <b-container>
    <h1>Тестовое задание EKF Frontend-разработчик</h1>
    <b-row>
      <b-col class="mb-4">
        <b-button v-b-toggle.collapse variant="primary">
          <span class="when-open">Скрыть</span>
          <span class="when-closed">Показать</span>
          текст задания
        </b-button>
        <b-collapse id="collapse" class="mt-2">
          <b-card>
            <h4 class="card-text">
              Сделать на nuxt.js или vue.js список товаров с ценами и форму редактирования товара
            </h4>
            <p>Требования:</p>
            <ol>
              <li>
                Список товаров это простая &lt;table&gt; и должна включать поля - наименование (поле
                name), артикул (поле vendor_code), серия (поле series), цена (поле price), поле с
                кнопкой редактирования товара которая будет вызывать форму редактирования (можно
                модальную) в которой можно будет отредактировать наименование и артикул.
              </li>
              <li>
                Цену в списке товаров отформатировать без копеек
              </li>
              <li>
                Товаров в базе данных очень много, поэтому нужно сделать постраничный вывод в
                таблице (например, отображать по 40 товаров за раз)
              </li>
              <li>
                Сделать используя graphql api - https://sweet-hedgehog-55.hasura.app/v1/graphql
              </li>
              <li>
                Внешний вид - не принципиально, можно использовать bootstrap 4
              </li>
            </ol>
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
    <EkfProductsTable></EkfProductsTable>
  </b-container>
</template>

<script>
import EkfProductsTable from '@/components/EkfProductsTable/EkfProductsTable.vue';

export default {
  name: 'Home',
  components: {
    EkfProductsTable,
  },
};
</script>

<style lang="scss" scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
