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
    <v-progress-linear
      v-if="isLoading"
      indeterminate
      color="green"
    />
    <table
      v-if="filteredData.length !== 0"
      class="table table-striped table-hover"
    >
      <thead>
        <tr>
          <th>_id</th>
          <th>Ingredient Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="data in filteredData"
          :key="data._id"
        >
          <td>{{ data._id }}</td>
          <td>{{ data.ingredient }}</td>
          <td>{{ data.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <v-alert
      v-else
      text="No warehouse inventory"
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
      orderDirections: ["asc", "desc"],
      headers: [
        {
          title: "ID",
          value: "_id",
        },
        {
          title: "Ingredient Name",
          value: "ingredient",
        },
        {
          title: "Quantity",
          value: "quantity",
        },
      ],
      filteredData: [],
      tableData: {
        data: [],
        metadata: {
          totalCount: 0,
          currentPage: 1,
          totalPages: 0,
          total: 0,
        },
      },
      snackbar: {
        show: false,
        message: "",
        color: "",
        timeout: 3000,
      },
      isLoading: false,
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
        window.scrollTo(0, 0);
      }
    },
    async fetchData(resetPage = false) {
      this.isLoading = true;
      try {
        if (resetPage) {
          this.currentPage = 1;
        }
        const filters = this.constructFilters();
        const res = await danimaxRestaurantApi.getWarehouseInventoryRecords(
          filters
        );

        this.tableData = res;
        // Set initial values
        this.currentPage = this.tableData.metadata.page;
        this.totalPages = Math.ceil(
          this.tableData.metadata.total / this.recordsPerPage
        );
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
      } finally {
        this.isLoading = false;
      }
    },
    stringFilter(type, value) {
      const filterMap = {
        page: `page=${value}`,
        skip: `skip=${value}`,
        take: `pageSize=${value}`,
        orderBy: `orderBy=${value}`,
        where: `where=${value}`,
      };

      return filterMap[type] || "";
    },
    constructFilters() {
      const start = (this.currentPage - 1) * this.recordsPerPage;
      const limit = this.recordsPerPage;

      const filters = [
        this.stringFilter("page", this.currentPage),
        this.stringFilter("skip", start),
        this.stringFilter("take", limit),
      ];

      return filters.filter(Boolean).join("&");
    },
    filteredRecords() {
      this.filteredData = this.tableData.data.filter((record) => {
        return (
          record._id.toString().includes(this.filterText) ||
          record.ingredient.toString().includes(this.filterText) ||
          record.quantity.toString().includes(this.filterText)
        );
      });
    },
  },
};
</script>
