<template>
  <div>
    <b-list-group v-if="allupdates">
      <b-list-group-item href="javascript:void(0)" v-for="item in updates" :key="item.message" class="p-15">
        <div class="d-flex update-list">
          <div class="pr-10 update-icon">
            <i class="sls-icons sls-24 order" v-if="item.order"></i>
            <i class="sls-icons sls-24 comment" v-if="!item.order"></i>
          </div>
          <div class="update-test">
            <div>
              <P v-if="item.order">
                Your new order
                <router-link to="/order/order-detail/1000123456716">{{ item.ordernumber }}</router-link> has been placed successfuly
              </P>
              <P v-if="!item.order">
                {{item.username}} has commented on your order
                <router-link to="/order/order-detail/1000123456716">{{ item.ordernumber }}</router-link>
              </P>
              <p>{{ item.description }}</p>
            </div>
            <div class="update-date">
              <p>{{item.date}}</p>
            </div>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
    <div class v-if="emptyupdates">
      <div class="no-updates d-flex justify-content-center align-items-center">
        <p class="fw-500">You have no Updates to display.</p>
      </div>
    </div>
  </div>
</template>

<script src="./recentUpdates.js"></script>
<style src="./recentUpdates.scss" lang="scss" scoped />
