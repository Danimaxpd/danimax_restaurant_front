<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto" color="grey-lighten-3">
            <v-card-text>
              <v-text-field v-model="filterText" density="compact" variant="solo" label="Search in table"
                append-inner-icon="mdi-magnify" single-line hide-details @update:model-value="filteredRecords()" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="2">
          <div class="alert alert-light" role="alert">
            <v-select v-model="orderBy" :items="headers" label="Order By" variant="underlined"
              @update:model-value="fetchData(true)" />
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <div class="alert alert-light" role="alert">
            <v-select v-model="orderByDirection" :items="orderDirections" label="Direction" variant="underlined"
              @update:model-value="fetchData(true)" />
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="alert alert-light" role="alert">
            <v-select v-model="recordsPerPage" :items="arrRecordsPerPage" label="Records Per Page" variant="underlined"
              @update:model-value="fetchData(true)" />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Operation ID</th>
          <th>User ID</th>
          <th>Amount</th>
          <th>User Balance</th>
          <th>Operation Response</th>
          <th>Date</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredData" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ record.operation_id }}</td>
          <td>{{ record.user_id }}</td>
          <td>{{ record.amount }}</td>
          <td>{{ record.user_balance }}</td>
          <td>{{ record.operation_response }}</td>
          <td>{{ record.date }}</td>
          <td>
            <v-btn density="compact" icon="mdi-delete" color="error" @click="deleteRecord(record.id)">
              <v-tooltip activator="parent" location="start">
                Do you want to delete?
              </v-tooltip>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click="changePage(currentPage - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" aria-label="Next" @click="changePage(currentPage + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import calculatorApi from "@/services/api-danimax_restaurant";

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
      orderBy: "",
      orderByDirection: 'asc',
      headers: [
        {
          title: "ID",
          value: "id",
        },
        {
          title: "Operation ID",
          value: "operation_id",
        },
        {
          title: "User ID",
          value: "user_id",
        },
        {
          title: "Amount",
          value: "amount",
        },
        {
          title: "User Balance",
          value: "user_balance",
        },
        {
          title: "Operation Response",
          value: "operation_response",
        },
      ],
      filteredData:[],
      data: {
        records: [],
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
    this.getUserId();
    this.fetchData();
  },
  methods: {
    getUserId() {
      const token = this.$store.getters.getPayloadToken;
      this.userId = token?.userId
    },
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
        const response = await calculatorApi.getRecords(filters);
        const data = response.data;
        this.data = data;
        // Set initial values
        this.currentPage = this.data.metadata.currentPage;
        this.totalPages = this.data.metadata.totalPages;
        this.filteredRecords();
      } catch (error) {
        this.snackbar = {
          show: true,
          message: "Error getting Records Info",
          color: "error",
          timeout: 3000,
        };
      }
    },
    async deleteRecord(id) {
      try {
        await calculatorApi.deletedRecord(id);
        this.fetchData();
        this.snackbar = {
          show: true,
          message: `Deleted record with ID: ${id}`,
          color: "success",
          timeout: 3000,
        };
      } catch (error) {
        this.snackbar = {
          show: true,
          message: `Error deleting record with ID: ${id}`,
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
          result = `take=${value}`;
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

      const filterOrderBy = this.stringFilter('orderBy', `{"${this.orderBy}": "${this.orderByDirection}"}`);
      if (this.orderBy) {
        filters.push(filterOrderBy);
      }

      const filterWhere = this.stringFilter('where', `{"deleted": false, "user_id":${this.userId}}`);
      if (filterWhere) {
        filters.push(filterWhere);
      }

      return filters.join('&');
    },
    filteredRecords() {
      this.filteredData = this.data.records
        .filter((record) => {
          return (
            record.id.toString().includes(this.filterText) ||
            record.operation_id.toString().includes(this.filterText) ||
            record.user_id.toString().includes(this.filterText) ||
            record.amount.toString().includes(this.filterText) ||
            record.user_balance.toString().includes(this.filterText) ||
            record.operation_response.includes(this.filterText) ||
            record.date.includes(this.filterText)
          );
        });
    }
  },
};
</script>
