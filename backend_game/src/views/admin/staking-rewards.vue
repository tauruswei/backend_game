<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="card ">
            <div class="card-header ">
              <h4 class="card-title">COSD Staking
                <small class="description">Please choose purpose</small>
              </h4>
            </div>
            <div class="card-body ">
              <div class="alert alert-warning">
                <span>Reminder: BSC(Binance smart chain) chain supported only, we'll support various chains soon.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from "vue"
  const active = ref("sll")
  function handleClick(tab) {
    active.value = tab;
  }
  </script>