<template>
  <div class="container">
    <div class="mt-4 bg-light">
      <p class="fw-500 text-order faq-details">Frequently Asked Questions (FAQ`s)</p>
      <b-card no-body class="border-0">
        <div class="faq-list">
          <b-card-header header-tag="header" class="p-0 border-0" role="tab">
            <div
              class="d-flex align-items-center justify-content-between pr-s5 p-10 border-bottom"
              v-b-toggle.accordion-1
            >
              <p>Lorem Ipsum is not simply random text.</p>
              <em class="sls-icons sls-20 arrow"></em>
            </div>
          </b-card-header>
          <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </div>
        <div class="faq-list">
          <b-card-header header-tag="header" class="p-0 border-0" role="tab">
            <div
              class="d-flex align-items-center justify-content-between pr-s5 p-10 border-bottom"
              v-b-toggle.accordion-2
            >
              <p>Lorem Ipsum is not simply random text.</p>
              <em class="sls-icons sls-20 arrow"></em>
            </div>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </div>
        <div class="faq-list">
          <b-card-header header-tag="header" class="p-0 border-0" role="tab">
            <div
              class="d-flex align-items-center justify-content-between pr-s5 p-10 border-bottom"
              v-b-toggle.accordion-3
            >
              <p>Lorem Ipsum is not simply random text.</p>
              <em class="sls-icons sls-20 arrow"></em>
            </div>
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </div>
        <div class="faq-list">
          <b-card-header header-tag="header" class="p-0 border-0" role="tab">
            <div
              class="d-flex align-items-center justify-content-between pr-s5 p-10 border-bottom"
              v-b-toggle.accordion-4
            >
              <p>Lorem Ipsum is not simply random text.</p>
              <em class="sls-icons sls-20 arrow"></em>
            </div>
          </b-card-header>
          <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script src="./faq.js"></script>
<style src="./faq.scss" lang="scss" scoped />
