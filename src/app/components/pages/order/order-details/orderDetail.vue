<template>
  <div>
    <div class="container">
      <div>
        <div v-if="ordernum == order.id">
          <div class="row no-gutters">
            <div class="col-md-12 col-lg-8">
              <div class="text-left pt-30 pb-10 d-flex justify-content-between">
                <p class="text-black text-uppercase">
                  <a href="javascript:void(0)">
                    <router-link to="/order">
                      <span>
                        <em class="sls-icons sls-24 back-arrow"></em>
                      </span>
                    </router-link>
                  </a>
                  ORDER DETAILS
                </p>
                <div>
                  <a class="pr-20" href="javascript:void(0)">
                    <em class="sls-icons sls-24 download"></em>
                  </a>
                  <a href="javascript:void(0)" @click="printWindow()">
                    <em class="sls-icons sls-24 print"></em>
                  </a>
                  <a href="javascript:void(0)" class="pl-10 d-inline d-md-none d-lg-none">
                    <router-link to="/order/comment">
                      <em class="sls-icons sls-24 comment-dark"></em>
                    </router-link>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row no-gutters">
            <div class="col-md-12 col-lg-8">
              <div class="card order-details-list">
                <div class="card-body">
                  <div class="mobile-border">
                    <p class="small text-order text-uppercase pb-15">Overview</p>
                    <div class="row no-gutters">
                      <div class="col-12 col-sm-6 col-md-4">
                        <p class="small text-black">
                          <span class="text-order">Order No.:</span>
                          {{order.id}}
                        </p>
                        <p class="small text-order2">{{order.date}}</p>
                        <div class="d-flex align-items-center pb-10">
                          <div v-if="statusProject == 'Placed with SLS'">
                            <em class="portial bg-primary"></em>
                            <span class="fs-14">{{ statusProject }}</span>
                            <a
                              href="javascript:void(0)"
                              class="pl-10 text-primary fs-14"
                              v-b-modal.modal-prevent-closing
                            >Update Status</a>
                          </div>
                          <div v-if="statusProject == 'Completed'">
                            <em class="portial bg-success"></em>
                            <span class="fs-14">{{ statusProject }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <p class="text-order small">No. of Online Products</p>
                        <p class="small pb-10">{{ order.products.length }}</p>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <p class="text-order small">No. of Requested Products</p>
                        <p class="small pb-10">{{ order.requests.length }}</p>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <div class>
                          <p class="text-order small">Order Total</p>
                          <p class="text-black small pb-10">
                            {{ currency.toUpperCase() }} {{ total.toFixed(2) }}
                            <span v-b-tooltip.hover.right="'View Breackup'">
                              <a href="#notes">
                                <em class="sls-icons sls-24 i-icons"></em>
                              </a>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <div class>
                          <p class="text-order small">Placed By</p>
                          <p class="text-black small pb-10">{{ order.user.fname }} {{ order.user.lname }}</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-6 col-md-4">
                        <div class>
                          <p class="text-order small">For Customer</p>
                          <p class="text-black small pb-10" v-if="order.user.organization">{{ order.user.organization.name }}</p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-8">
                        <div class="pt-10">
                          <p class="text-order small">Delivery Address:</p>
                          <p class="text-black small">{{ order.address.line1 }}</p>
                          <p
                            class="text-order2 small"
                          >{{ order.address.line2 }}</p>
                        </div>
                      </div>
                    </div>
                    <!-- BL assign list  -->
                    <div class="pt-20 bl-assign">
                      <div class="bg-g100 rounded p-15">
                        <div class="row">
                          <div class="col-md-4 col-lg-4" v-if="isBuyingLead || isInternalBuyer">
                            <div class="bl-list p-0">
                              <p class="text-order small">Project Manager</p>
                              <p class="small">
                                <span v-if="order.manager">{{ order.manager.fname }} {{ order.manager.lname }}</span>
                                <a
                                  href="javascript:void(0)"
                                  class="pl-s5 text-primary fs-14"
                                  @click="openModal('project-manager-modal')"
                                >Change</a>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-4" v-if="isBuyingLead">
                            <div class="bl-list">
                              <p class="text-order small">Buying Lead</p>
                              <p class="small">
                                <span v-if="order.buying_lead">{{ order.buying_lead.fname }} {{ order.buying_lead.lname }}</span>
                                <a
                                  href="javascript:void(0)"
                                  class="pl-s5 text-primary fs-14"
                                  @click="openModal('buying-lead-modal')"
                                >Change</a>
                              </p>
                            </div>
                          </div>
                          <div class="col-md-4 col-lg-4" v-if="isBuyingLead">
                            <div class="bl-list">
                              <p class="text-order small">Internal Buyer</p>
                              <p class="small">
                                <span v-if="order.internal_buyer">{{ order.internal_buyer.fname }} {{ order.internal_buyer.lname }}</span>
                                <a
                                  href="javascript:void(0)"
                                  class="pl-s5 text-primary fs-14"
                                  @click="openModal('internal-buyer-modal')"
                                >Change</a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- product Details -->
                  <div class="d-flex justify-content-between pt-20">
                    <p class="text-order small text-uppercase pb-10">Product details:</p>
                    <a
                      v-if="recentDelted"
                      href="javascript:void(0)"
                      class="text-primary d-none d-lg-block d-md-block d-xl-block"
                      v-b-modal.modal-prevent-update
                    >Update Selected</a>
                  </div>
                  <table class="table product-details d-none d-lg-block d-md-block d-xl-block">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col" class="pt-0 pb-0 pr-0">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              @click="checkAll()"
                              v-model="ordercheck"
                              id="customCheck1"
                            />
                            <label
                              class="custom-control-label p-0 m-0 text-uppercase"
                              for="customCheck1"
                            ></label>
                          </div>
                        </th>
                        <th scope="col" width="60">Sr. No.</th>
                        <th scope="col">Product Details</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Sub Total</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(product, index) in order.products" :key="product.id">
                        <td>
                          <label class="custom-check">
                            <input
                              type="checkbox"
                              v-bind:value="product"
                              v-model="selectcheck"
                              @change="updateCheckall()"
                            />
                            <span class="checkmark"></span>
                          </label>
                        </td>
                        <td>{{ index + 1 }}</td>
                        <td>
                          <!-- <p class="text-order fw-600">{{item.products.badge}}</p> -->
                          <p class="text-black fw-500">{{ product.name }}</p>
                          <p class="text-black">{{ product.cas }}</p>
                          <p class="text-black">{{ product.purity }} Pure</p>
                          <p class="text-black">Pack Size: {{ product.packsize }}</p>
                        </td>
                        <td>{{ product.pivot.qty }}</td>
                        <td>{{ product.supplier }}</td>
                        <td>
                          <p class="text-right">{{ product.usd.toFixed(2) }}</p>
                          <p class="fs-12 text-right">{{ product.inr.toFixed(2) }}</p>
                        </td>
                        <td>
                          <p class="text-right">USD {{ (product.usd * product.pivot.qty).toFixed(2) }}</p>
                          <p class="fs-12 text-right">INR {{ (product.inr * product.pivot.qty).toFixed(2) }}</p>
                        </td>
                        <td>
                          <!-- <p>{{item.status}}</p>
                          <p>PO No.: {{item.Pr}}</p>
                          <p>PR No.:{{item.po}}</p> -->
                          <a
                            href="javascript:void(0)"
                            class="text-primary"
                            @click="showUpdateModal(product)"
                          >View/update</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-block d-md-none d-lg-none">
                    <ul class="list-group product-details-orders">
                      <li
                        class="list-group-item pl-10 pr-10 d-flex align-items-center justify-content-between"
                      >
                        <div class="select-all d-flex align-items-center">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              @click="checkAll()"
                              v-model="ordercheck"
                              id="customCheck1"
                            />
                            <label
                              class="custom-control-label p-0 m-0 text-uppercase"
                              for="customCheck1"
                            ></label>
                          </div>
                          <span class="text-order2 pt-1 fs-14">Select all</span>
                        </div>
                        <a
                          v-if="recentDelted"
                          href="javascript:void(0)"
                          class="text-primary"
                          v-b-modal.modal-prevent-update
                        >Update Selected</a>
                      </li>
                    </ul>
                  </div>
                  <!-- please note -->
                  <div class="bg-g200 rounded p-15" id="notes">
                    <p class="small fw-500">Please note:</p>
                    <p
                      class="pb-s5 small"
                    >The above total cart amount does not include the cost of the products requested to order.</p>
                    <p
                      class="pb-s5 small"
                    >The above costs are based on information provided by vendors and are subjected to change.</p>
                    <p
                      class="pb-s5 small"
                    >In case any product becomes unavailable by the time the order is placed, Sai Life Sciences team would order it for you.</p>
                  </div>
                  <!-- history -->
                  <ul class="history pt-20 list-group">
                    <p class="text-uppercase">history</p>
                    <li
                      v-for="(history, index) in order.histories"
                      :key="index"
                      class="list-group-item border-0 history-data pl-0">
                      <div class="d-flex">
                        <div class="history-icons">
                          <div class="circle"></div>
                          <div class="border-line"></div>
                        </div>
                        <div class="history-text">
                          <p class="text-black fw-500" v-html="history.message"></p>
                          <p class="small text-order2">{{ format(history.updated_at, 'MMM DD, YYYY - HH:mm a') }}</p>
                          <p class="text-black fw-500" v-if="history.user">{{ history.user.fname }} {{ history.user.lname }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- comment card -->
            <div class="col-md-12 col-lg-4 d-none d-lg-block d-md-block d-xl-block">
              <div class="card order-comments sticky-top">
                <div class="card-header small">Comments</div>
                <div class="card-body">
                  <ul class="list-group">
                    <li
                      class="list-group-item"
                      v-for="(comment, index) in order.comments"
                      :key="index">
                      <div class="d-flex">
                        <div class="circle bg-info"></div>
                        <div class="commennt-info">
                          <p class="small text-black fw-600">{{ comment.user.fname }} {{ comment.user.lname }}</p>
                          <p class="small text-black">{{ comment.message }}</p>
                          <p class="fs-12 text-order2"> {{ format(comment.updated_at, 'MMM DD, YYYY - HH:mm a') }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="card-footer">
                  <div class="input-group">
                    <input
                      v-model="message"
                      type="text"
                      class="form-control"
                      placeholder="Add comment"
                      aria-label="Add comment"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-link p-10" type="button" @click="comment">
                        <img src="~@/assets/images/icons/send.svg" alt="Send" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- update order-details modal -->
    <div class="update-modal">
      <b-modal
        id="modal-prevent-update"
        ref="cart-update-modal"
        title="Submit Your Name"
        size="lg"
        centered
        hide-header
        hide-footer
      >
        <div class="card-header pt-0 pl-0 pr-0 card-update-header">
          <div class="d-flex align-items-center justify-content-between">
            <p>Update Product Order Information (01)</p>
            <div class="d-flex">
              <button class="btn btn-link" @click="hideModal('cart-update-modal')">Cancel</button>
              <button
                class="btn btn-primary d-none d-lg-block d-md-block d-xl-block"
                @click="updateDeatils"
              >Submit</button>
            </div>
          </div>
        </div>
        <div class="card-body pb-0 pl-0 pr-0 card-update-body">
          <div class="card border-0">
            <div class="card-header">
              <div class="d-none d-lg-block d-md-block d-xl-block">
                <div class="row no-gutters">
                  <div class="col-md-1">
                    <p class="fw-500">S.no</p>
                  </div>
                  <div class="col-md-2">
                    <p class="fw-500">Product Details</p>
                  </div>
                  <div class="col-md-9">
                    <div class="row">
                      <div class="col-md-2">
                        <p class="fw-500">Quantity</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">Supplier</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">Unit Price</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">Sub Total</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">PR No.</p>
                      </div>
                      <div class="col-md-2">
                        <p class="fw-500">PO No.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-block d-md-none d-lg-none">
                <div v-if="RequestList!== null">
                  <div v-for="request in RequestList" :key="request.id">
                    <div class="row no-gutters justify-content-between">
                      <div class="d-flex">
                        <p class="text-black fw-600">{{request.id}}</p>
                        <div class="pl-2">
                          <!-- <p class="text-order fw-600">{{request.products.badge}}</p> -->
                          <!-- <p class="text-black fw-500 fs-14">{{request.product.name}}</p> -->
                          <!-- <p class="text-black">{{request.products.pcode}}</p> -->
                        </div>
                      </div>
                      <div class="d-flex align-items-end flex-column">
                        <p class="text-black">{{request.purity}} Pure</p>
                        <p class="text-black">Pack Size: {{request.packsize}}</p>
                        <a class="text-primary" @click="hideRequestCard">
                          <span v-if="!hideCard">View Details</span>
                          <span v-if="hideCard">Hide Details</span>
                          </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="hideCard">
              <div class="card-body production-update p-0">
                <div v-if="RequestList!== null">
                  <div
                    class="row no-gutters border-bottom"
                    v-for="request in RequestList"
                    :key="request.id"
                  >
                    <div class="col-md-1">
                      <div class="d-none d-lg-block d-md-block d-xl-block">{{request.id}}</div>
                    </div>
                    <div class="col-md-2">
                      <div class="d-none d-lg-block d-md-block d-xl-block">
                        <!-- <p class="text-order fw-600">{{request.products.badge}}</p> -->
                        <!-- <p class="text-black fw-500">{{request.products.pname}}</p> -->
                        <!-- <p class="text-black">{{request.products.pcode}}</p> -->
                        <p class="text-black">{{request.purity}} Pure</p>
                        <p class="text-black">Pack Size: {{request.packsize}}</p>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <div class="row">
                        <div class="col-6 col-md-2">
                          <input
                            v-model="request.pivot.qty"
                            name="quantity"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request.supplier"
                            name="supplier"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request.usd"
                            name="usd"
                            type="text"
                            class="form-control input-sm"
                          />
                          <p class="text-right tex-order1 fs-12">in INR : {{ request.inr.toFixed(2) }}</p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            :value="(request.pivot.qty * request.usd).toFixed(2)"
                            name="subprice"
                            type="text"
                            class="form-control input-sm"
                          />
                          <p class="text-right text-order1 fs-12">in INR : {{ (request.pivot.qty * request.inr).toFixed(2) }}</p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request.prno"
                            name="product_request_number"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <input
                            v-model="request.pono"
                            :name="product_order_number"
                            type="text"
                            class="form-control input-sm"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6 offset-md-8 col-md-2">
                          <div class="form-group float-right m-0">
                            <a
                              @click="addPR()"
                              href="javascript:void(0)"
                              class="text-primary fs-14"
                            >Add PR</a>
                          </div>
                        </div>
                        <div class="col-6 col-sm-6 col-md-2">
                          <div class="form-group float-right m-0">
                            <a
                              @click="addExperience()"
                              href="javascript:void(0)"
                              class="text-primary fs-14"
                            >Add PO</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-block d-md-none d-lg-none p-0 pt-2">
          <button class="btn btn-primary btn-block">Submit</button>
        </div>
      </b-modal>
    </div>
    <!-- bl assign modal view -->
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="my-modal"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <b-form-group>
          <b-form-radio-group v-model="selected" :options="options" name="radios-stacked" stacked></b-form-radio-group>
        </b-form-group>
        <div class="float-right">
          <button class="btn btn-link" @click="hideModal">Cancel</button>
          <button class="btn btn-primary" @click="showModal">Ok</button>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-prevent-manage"
        ref="project-manager-modal"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <p class="pt-10 pb-10 fw-600">Assign Project manager</p>
        <b-form-select
          :searchable="false"
          v-model="order.manager_id"
          placeholder="Select Customer"
          class="assign-lead"
          :options="projectManagers"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <em class="sls-icons sls-16 arrow"></em>
            </span>
          </template>
        </b-form-select>
        <div class="float-right pt-20">
          <button class="btn btn-link" type="reset" @click="hideModal('project-manager-modal')">Cancel</button>
          <button class="btn btn-primary" type="submit" @click="changeOrderDetails(order, 'project-manager', 'project-manager-modal')">Ok</button>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-prevent-buying"
        ref="buying-lead-modal"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <p class="fw-600 pt-10 pb-10">Assign Buying Lead</p>
        <b-form-select
          :searchable="false"
          v-model="order.buying_lead_id"
          placeholder="Select Customer"
          class="assign-lead"
          :options="buyingLeads"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <em class="sls-icons sls-16 arrow"></em>
            </span>
          </template>
        </b-form-select>
        <div class="float-right pt-20">
          <button class="btn btn-link" type="reset" @click="hideModal('buying-lead-modal')">Cancel</button>
          <button class="btn btn-primary" type="submit" @click="changeOrderDetails(order, 'buying-lead', 'buying-lead-modal')">Ok</button>
        </div>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-prevent-assign"
        ref="internal-buyer-modal"
        title="Submit Your Name"
        size="sm"
        centered
        hide-header
        hide-footer
      >
        <p class="fw-600 pt-10 pb-10">Assign Buying Lead</p>
        <b-form-select
          :searchable="false"
          v-model="order.internal_buyer_id"
          placeholder="Select Customer"
          class="assign-lead"
          :options="internalBuyers"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <em class="sls-icons sls-16 arrow"></em>
            </span>
          </template>
        </b-form-select>
        <div class="float-right pt-20">
          <button class="btn btn-link" type="reset" @click="hideModal('internal-buyer-modal')">Cancel</button>
          <button class="btn btn-primary" type="submit" @click="changeOrderDetails(order, 'internal-buyer', 'internal-buyer-modal')">Ok</button>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script src="./orderDetail.js"></script>
<style src="./orderDetail.scss" lang="scss" scoped />
