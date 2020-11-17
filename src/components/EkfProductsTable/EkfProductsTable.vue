<template>
  <b-container>
    <b-table
      sticky-header="75vh"
      striped
      hover
      :items="products"
      :fields="fields"
      :busy="$apollo.loading"
    >
      <template #cell(index)="data">
        {{ data.index + offset + 1 }}
      </template>

      <template #cell(prices)="data"> {{ Math.round(data.value[0].price) }} руб. </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Загрузка данных...</strong>
        </div>
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Спрятать" : "Показать" }} описание
        </b-button>
        <b-button size="sm" @click="editProduct(row.item, $event.target)">
          Изменить
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          {{ row.item.short_name }}
        </b-card>
      </template>
    </b-table>
    <b-row>
      <b-col sm="4" md="5">
        <b-form-group
          label="Кол-во строк"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions">
            <b-form-select-option :value="AllProducts.length">Показать всё</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="7" md="6">
        <b-pagination
          v-if="!$apollo.loading"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="right"
          first-number
          last-number
          @input="showMore"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-modal ref="modal" :id="editModal.id" :title="editModal.title">
      <b-form>
        <b-form-group label="Наименование:" label-for="name">
          <b-form-input
            id="name"
            v-model="editModal.content.name"
            required
            placeholder="Наименование"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationName">
            Поле обязательно должно содержать данные.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Артикул:" label-for="vendor_code">
          <b-form-input
            id="vendor_code"
            v-model="editModal.content.vendor_code"
            required
            placeholder="Артикул"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationCode">
            Поле обязательно должно содержать данные.
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <b-button class="mt-3" variant="danger" @click="hideModal">Закрыть</b-button>
        <b-button class="mt-3" variant="primary" @click="handleOk">Сохранить</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { GetProducts, AllProducts, UpdateProduct } from '@/graphql/products';

export default {
  name: 'EkfProductsTable',
  data: () => ({
    totalRows: 1,
    currentPage: 1,
    perPage: 10,
    offset: 0,
    pageOptions: [10, 20, 30, 40, 50],
    editModal: {
      id: 'edit-modal',
      title: '',
      content: {
        id: '',
        name: '',
        vendor_code: '',
      },
    },
    AllProducts: [],
    fields: [
      {
        key: 'index',
        label: '№',
        sortable: false,
      },
      {
        key: 'name',
        label: 'Наименование',
        sortable: true,
      },
      {
        key: 'vendor_code',
        label: 'Артикул',
        sortable: true,
      },
      {
        key: 'series',
        label: 'Серия',
        sortable: true,
      },
      {
        key: 'prices',
        label: 'Цена',
        sortable: true,
      },
      {
        key: 'actions',
        label: '',
      },
    ],
  }),
  apollo: {
    AllProducts: {
      query: AllProducts,
    },
    products: {
      query: GetProducts,
      variables() {
        return {
          limit: this.perPage,
          offset: this.offset,
        };
      },
    },
  },
  computed: {
    rows() {
      return this.AllProducts.length;
    },
    validationName() {
      return this.editModal.content.name !== '';
    },
    validationCode() {
      return this.editModal.content.vendor_code !== '';
    },
  },
  methods: {
    editProduct(item, button) {
      this.editModal.title = `Изменить ${item.name}`;
      this.editModal.content.id = item.id;
      this.editModal.content.name = item.name;
      this.editModal.content.vendor_code = item.vendor_code;
      this.$root.$emit('bv::show::modal', this.editModal.id, button);
    },
    hideModal() {
      this.editModal.title = '';
      this.editModal.content.name = '';
      this.$refs.modal.hide();
    },
    handleOk() {
      if (this.editModal.content.name && this.editModal.content.vendor_code) {
        this.$apollo
          .mutate({
            mutation: UpdateProduct,
            variables: {
              id: this.editModal.content.id,
              name: this.editModal.content.name,
              code: this.editModal.content.vendor_code,
            },
          })
          .then(() => {
            this.$refs.modal.hide();
          })
          .catch((error) => {
            window.console.error(error);
          });
      }
    },
    showMore(page) {
      this.offset = this.perPage * page - this.perPage;
    },
  },
};
</script>
