<template>
  <div>
    <div class="container">
      <div class="order-filter-header">
        <p class="small mb-2">Last updated March 8th,2020; 19:00</p>
        <b-form-group class="mb-0 order-search-filter">
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Search your orders"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <div class="d-flex align-items-center justify-content-end">
          <p class="pr-15 text-order fw-500">Export</p>
          <div class="filter-order d-flex justify-content-end pt-15 pb-15 pl-15">
            <p class="small" @click="filterSearch()">
              <span class="pr-10">
                <img src="~@/assets/images/icons/filter.svg" alt="filter" />
              </span>Filter
            </p>
          </div>
        </div>
        <div
          class="container shodow-sm advance-filter filter-search"
          v-on-clickaway="sortfilter"
          v-if="filterSection"
        >
          <b-form @submit="onSubmit" @reset="onReset">
            <div class="row">
              <div class="col-md-6 col-lg-3">
                <b-form-group id="input-group-3" label="Customer :" label-for="input-3">
                  <v-select
                    :searchable="false"
                    v-model="form.Customer"
                    placeholder="Select Customer"
                    :options="Customer"
                  >
                    <template #open-indicator="{ attributes }">
                      <span v-bind="attributes">
                        <em class="sls-icons sls-16 arrow"></em>
                      </span>
                    </template>
                  </v-select>
                </b-form-group>
              </div>
              <div class="col-md-6 col-lg-3">
                <b-form-group id="input-group-4" label="Project Manager :" label-for="input-4">
                  <v-select
                    :searchable="false"
                    v-model="form.Pmanager"
                    placeholder="Select Project Manager"
                    :options="Pmanager"
                  >
                    <template #open-indicator="{ attributes }">
                      <span v-bind="attributes">
                        <em class="sls-icons sls-16 arrow"></em>
                      </span>
                    </template>
                  </v-select>
                </b-form-group>
              </div>
              <div class="col-md-6 col-lg-3">
                <b-form-group id="input-group-5" label="Buying Lead :" label-for="input-5">
                  <v-select
                    :searchable="false"
                    v-model="form.Buying"
                    placeholder="Select Buying Lead"
                    :options="Buying"
                  >
                    <template #open-indicator="{ attributes }">
                      <span v-bind="attributes">
                        <em class="sls-icons sls-16 arrow"></em>
                      </span>
                    </template>
                  </v-select>
                </b-form-group>
              </div>
              <div class="col-md-6 col-lg-3">
                <b-form-group id="input-group-6" label="Internal Buyer :" label-for="input-6">
                  <v-select
                    :searchable="false"
                    v-model="form.Internal"
                    placeholder="Select Internal Buyer"
                    :options="Internal"
                  >
                    <template #open-indicator="{ attributes }">
                      <span v-bind="attributes">
                        <em class="sls-icons sls-16 arrow"></em>
                      </span>
                    </template>
                  </v-select>
                </b-form-group>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="filter-datepicker">
                  <label class="date-label mb-0" for="datepicker-dateformat2">From</label>
                  <b-form-datepicker
                    id="datepicker-dateformat2"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="en"
                    v-model="form.from"
                    :hide-header="true"
                  ></b-form-datepicker>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="filter-datepicker">
                  <label class="date-label mb-0" for="datepicker-dateformat2">To</label>
                  <b-form-datepicker
                    id="datepicker-dateformat3"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    locale="en"
                    v-model="form.to"
                    :hide-header="true"
                  ></b-form-datepicker>
                </div>
              </div>
              <div class="mt-2 ml-auto pr-15">
                <b-button variant="link text-primary" type="reset">Clear All</b-button>
                <button class="btn btn-primary" type="submit">Apply</button>
              </div>
            </div>
          </b-form>
        </div>
      </div>

      <div>
        <div class="card p-0 order-filter-list">
          <div class="card-body p-0">
            <b-table
              class="recent-orders recent-updates"
              stacked="md"
              striped
              hover
              sort-icon-left
              show-empty
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filterIncludedFields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered"
              :items="orders"
              :fields="fielast_namelds"
            >
              <template v-slot:cell(cas)="data">
                <p class="d-none d-lg-block d-md-block d-xl-block">{{ data.value }}</p>
              </template>
              <template v-slot:cell(product)="data">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data">{{ data.value }}</span>
                  <span class="tooltiptext">{{ data.value }}</span>
                </div>
              </template>
              <template v-slot:cell(qty)="data">
                <p class="d-none d-lg-block d-md-block d-xl-block">{{ data.value }}</p>
              </template>
              <template v-slot:cell(user)="data">
                <div class="d-none d-lg-block d-md-block d-xl-block tooltip-data">
                  <span class="tolltip-data">{{ data.value.fname }} {{ data.value.lname }}</span>
                  <span class="tooltiptext">{{ data.value.fname }} {{ data.value.lname }}</span>
                </div>
              </template>
              <template v-slot:cell(order_id)="data">
                <router-link class="d-none d-lg-block d-md-block d-xl-block" :to="'/order/order-detail/' + data.value">{{ data.value }}</router-link>
              </template>
              <template v-slot:cell(created_at)="data">
                <div class="d-none d-lg-block d-md-block d-xl-block">
                  <div class="status-icons d-flex justify-content-between">
                    <p>{{ format(data.value, 'MMM DD, YY') }}</p>
                  </div>
                </div>
              </template>
              <template v-slot:cell(actions)="data">
                <div class="text-right">
                  <b-dropdown
                    size="sm"
                    dropleft
                    text="Drop-Left"
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                    class="p-0"
                  >
                    <template v-slot:button-content class="p-0">
                      <em class="sls-icons sls-24 order-details"></em>
                    </template>
                    <li><router-link class="dropdown-item" :to="'/order/order-detail/' + data.value.id">View Details</router-link></li>
                  </b-dropdown>
                </div>
              </template>
              <!-- <template v-slot:cell(actions)="row">
                <b-card class="d-block d-md-none d-lg-none">
                  <router-link to="/order/order-detail/1000123456716">
                    <div v-for="(list, key) in row" :key="key">
                      <div class="d-flex align-items-center justify-content-between">
                        <div class>
                          <a
                            class="pb-10"
                            :href="'/order/order-detail/1000123456716'"
                          >{{ list.Related }}</a>
                          <p class="fw-500">{{list.CAS}}</p>
                          <p class="fw-500">{{list.Customer}}</p>
                        </div>
                        <div class="status-mobile">
                          <p v-if="list.status" class="completed">completed</p>
                          <p v-if="list.status == false" class="portical">P completed</p>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <p>{{list.Product}}</p>
                        <p>{{list.date}}</p>
                      </div>
                    </div>
                  </router-link>
                </b-card>
              </template> -->
            </b-table>
          </div>

          <div class="card-footer bg-g400 pt-s5 pb-s5">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <p class="pr-s5">Showing :</p>
                <div class="quantity-select">
                  <v-select :searchable="false" v-model="perPage" :options="pageOptions" size="sm"></v-select>
                </div>
              </div>

              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./requestProduct.js"></script>
<style src="./requestProduct.scss" lang="scss" scoped />
