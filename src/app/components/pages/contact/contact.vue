<template>
  <div class>
    <div class="contact-us">
      <p class="d-flex h-100 align-items-center justify-content-center fs-24 text-light">Contact Us</p>
    </div>
    <div class="container my-4">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body get-in-touch">
              <b-form-group label-size="sm">
                <b-form-input id="input-sm" size="sm" placeholder="Name*"></b-form-input>
              </b-form-group>
              <b-form-group label-size="sm">
                <b-form-input id="input-sm" size="sm" placeholder="Email ID*"></b-form-input>
              </b-form-group>
              <b-form-group label-size="sm">
                <b-form-input id="input-sm" size="sm" placeholder="Company*"></b-form-input>
              </b-form-group>
              <b-form-group label-size="sm">
                <b-form-input id="input-sm" size="sm" placeholder="Phone*"></b-form-input>
              </b-form-group>
              <b-form-group label-size="sm">
                <b-form-textarea id="textarea-small" size="sm" placeholder="Message*"></b-form-textarea>
              </b-form-group>
              <button class="btn btn-primary text-uppercase">Get in Touch</button>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3806.168417089029!2d78.3601065!3d17.4516514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96d354866e29%3A0xa3bb6dd20b896ece!2sSai%20Life%20Sciences%20Ltd.!5e0!3m2!1sen!2sin!4v1590643385724!5m2!1sen!2sin"
              width="100%"
              height="250"
              frameborder="0"
              style="border:0;"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
              title="Contact Map"
            ></iframe>
          </div>
          <div class="mt-3">
            <div class="bg-info w-100 p-15">
              <p class="text-uppercase fs-18 text-primary pb-15">Corporate office</p>
              <p class="text-light pb-10">Want to visit us in India? Here’s where you will find us:</p>
              <p class="text-light">Sai Life Sciences Limited L4,</p>
              <p class="text-light">SLN Terminus, Gachibowli,</p>
              <p class="text-light">Hyderabad 500032, Telangana, India</p>
              <p class="text-light pt-10">Tel: +91 40 3315 6000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./contact.js"></script>
<style src="./contact.scss" lang="scss" scoped />
