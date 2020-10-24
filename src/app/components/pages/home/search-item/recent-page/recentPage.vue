<template>
  <div>
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="Recent Updates" active>
          <app-Updates></app-Updates>
          <div class="view-all">
            <a href="javascript:void(0)">
              <router-link to="/home/updates" class="text-primary">View All</router-link>
            </a>
          </div>
        </b-tab>
        <b-tab title="Recent Orders">
          <app-orders></app-orders>
          <div class="view-all">
            <a href="javascript:void(0)">
              <router-link to="/order" class="text-primary">View All</router-link>
            </a>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script src="./recentPage.js"></script>
