<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <div
            class="alert alert-light"
            role="alert"
          >
            <v-select
              v-model="recordsPerPage"
              :items="arrRecordsPerPage"
              label="Records Per Page"
              variant="underlined"
              @update:model-value="fetchData(true)"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <table
      v-if="filteredData.length !== 0"
      class="table table-striped table-hover"
    >
      <thead>
        <tr>
          <th>_id</th>
          <th>ingredient name</th>
          <th>Quantity Sold</th>
          <th>Create At</th>
          <th>Update At</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="data in filteredData"
          :key="data._id"
        >
          <td>{{ data._id }}</td>
          <td>{{ data.ingredientName }}</td>
          <td>{{ data.quantitySold }}</td>
          <td>{{ data.createDate }}</td>
          <td>{{ data.updateDate }}</td>
        </tr>
      </tbody>
    </table>
    <v-alert
      v-else
      text="No purchases"
    />
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="changePage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <a
            class="page-link"
            href="#"
            @click="changePage(page)"
          >{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click="changePage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import danimaxRestaurantApi from "@/services/api-danimax_restaurant";

export default {
  data() {
    return {
      userId: null,
      filterText: "",
      currentPage: 1,
      totalPages: 0,
      recordsPerPage: 10,
      arrRecordsPerPage: [5, 10, 50, 100],
      orderDirections: ['asc', 'desc'],
      headers: [
        {
          title: "ID",
          value: "_id",
        },
        {
          title: "Ingredient Name",
          value: "ingredientName",
        },
        {
          title: "Quantity Sold",
          value: "quantitySold",
        },
        {
          title: "Create At",
          value: "createDate",
        },
        {
          title: "Update At",
          value: "updateDate",
        },
      ],
      filteredData:[],
      tableData: {
        data: [],
        metadata: {
          totalCount: 0,
          currentPage: 1,
          totalPages: 0,
        },
      },
      snackbar: {
        show: false,
        message: '',
        color: '',
        timeout: 3000
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        await this.fetchData();
      }
    },
    async fetchData(resetPage=false) {
      try {
        if(resetPage) {
          this.currentPage = 1;
        }
        const filters = this.constructFilters();
        const res = await danimaxRestaurantApi.getWarehousePurchasedRecords(filters);
        
        this.tableData = res;
        // Set initial values
        this.currentPage = this.tableData.metadata.page;
        this.totalPages = (this.currentPage > 1) ? this.currentPage : 1;
        this.filteredRecords();
      } catch (error) {
        console.log("this.data", this.tableData);
        console.log("error", error);
        this.snackbar = {
          show: true,
          message: "Error getting Records Info",
          color: "error",
          timeout: 3000,
        };
      }
    },
    stringFilter(type, value) {
      let result = "";
      switch (type) {
        case "skip":
          result = `skip=${value}`;
          break;
        case "take":
          result = `pageSize=${value}`;
          break;
        case "orderBy":
          result = `orderBy=${value}`;
          break;
        case "where":
          result = `where=${value}`;
          break;
      }
      return result;
    },
    constructFilters(){
      const start = (this.currentPage - 1) * this.recordsPerPage;
      const end = this.recordsPerPage;

      const filters = [];

      const filterStart = this.stringFilter('skip', start);
      if (filterStart) {
        filters.push(filterStart);
      }

      const filterEnd = this.stringFilter('take', end);
      if (filterEnd) {
        filters.push(filterEnd);
      }

      return filters.join('&');
    },
    filteredRecords() {
      this.filteredData = this.tableData.data
        .filter((record) => {
          return (
            record._id.toString().includes(this.filterText) ||
            record.ingredientName.toString().includes(this.filterText) ||
            record.quantitySold.toString().includes(this.filterText) ||
            record.createDate.toString().includes(this.filterText) ||
            record.updateDate.toString().includes(this.filterText)
          );
        });
    }
  },
};
</script>
