<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            class="mx-auto"
            color="grey-lighten-3"
          >
            <v-card-text>
              <v-text-field
                v-model="filterText"
                density="compact"
                variant="solo"
                label="Search in table"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @update:model-value="filteredRecords()"
              />
            </v-card-text>
          </v-card>
        </v-col>
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
          <th>name</th>
          <th>ingredients</th>
          <th>Status</th>
          <th>Create At</th>
          <th>Update At</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="data in filteredData"
          :key="data._id"
        >
          <td>{{ data._id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ formatIngredients(data.ingredients) }}</td>
          <td>{{ data.status }}</td>
          <td>{{ data.createDate }}</td>
          <td>{{ data.updateDate }}</td>
          <td>
            <v-btn
              v-if="data.status !== 'done'"
              density="compact"
              icon="mdi-warning-outline"
              color="warning"
              @click="reProcessOrder(data._id)"
            >
              <v-tooltip
                activator="parent"
                location="start"
              >
                Re-Process Order
              </v-tooltip>
            </v-btn>
            <p v-else>
              ...
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <v-alert
      v-else
      text="No pending orders // if everything queue is done the data will be empty"
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
      orderBy: "",
      orderByDirection: "asc",
      headers: [
        {
          title: "ID",
          value: "_id",
        },
        {
          title: "Recipe Name",
          value: "name",
        },
        {
          title: "Ingredients",
          value: "ingredients",
        },
        {
          title: "Status",
          value: "status",
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
    formatIngredients(ingredients) {
      return ingredients
        .map((ingredient) => `${ingredient.name}: ${ingredient.qty}`)
        .join(", ");
    },
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
        const res = await danimaxRestaurantApi.getRecords(filters);

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
    async reProcessOrder(id) {
      try {
        await danimaxRestaurantApi.reProcessOrder(id);
        this.fetchData();
        this.snackbar = {
          show: true,
          message: `Re-processed record with ID: ${id}`,
          color: "success",
          timeout: 3000,
        };
      } catch (error) {
        this.snackbar = {
          show: true,
          message: `Error Re-processing record with ID: ${id}`,
          color: "error",
          timeout: 3000,
        };
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
          record.name.toString().includes(this.filterText) ||
          record.status.toString().includes(this.filterText)
        );
      });
    },
  },
};
</script>
