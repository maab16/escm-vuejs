<template>
  <div class="container">
    <div class="mt-4 bg-light">
      <p class="fw-500 text-order faq-details">Frequently Asked Questions (FAQ`s)</p>
      <b-card no-body class="border-0">
        <div class="faq-list" v-for="(faq, index) in faqs" :key="index">
          <b-card-header header-tag="header" class="p-0 border-0" role="tab">
            <div
              class="d-flex align-items-center justify-content-between pr-s5 p-10 border-bottom"
              v-b-toggle = "'accordion-' + (index + 1)"
            >
              <p>{{ faq.title }}</p>
              <em class="sls-icons sls-20 arrow"></em>
            </div>
          </b-card-header>
          <b-collapse :id="'accordion-' + (index + 1)" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>{{ faq.description }}</b-card-text>
            </b-card-body>
          </b-collapse>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script src="./faq.js"></script>
<style src="./faq.scss" lang="scss" scoped />
