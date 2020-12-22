<template>
  <div class="coupon-card">
    <div class="coupon-card__wrap">
      <div class="coupon-card__wrap__title">{{ title }}</div>
      <div class="coupon-card__wrap__code">
        <div class="coupon-card__wrap__code__block">
          <span>{{ codeLabel }}：</span>
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponCard',
  props: {
    title: {
      type: String,
      default: 'Give you a coupon as a reward',
    },
    value: {
      type: [Number, String],
      default: '',
    },
    codeLabel: {
      type: String,
      default: 'couponcode',
    },
  },
}
</script>

<style lang="scss" scoped>
.coupon-card {
  min-height: 117px;
  border-radius: 6px;
  background-color: #ec476c;
  padding: 10px;
  box-sizing: border-box;
  color: #ffffff;

  &__wrap {
    width: 100%;
    min-height: 117px;
    border: 1px dashed #ffffff;
    border-radius: 4px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
      text-align: center;
      font-size: 22px;
      margin-bottom: 10px;
      word-wrap: break-word;
    }

    &__code {
      display: flex;
      justify-content: center;
      &__block {
        border: 1px solid #ffffff;
        padding: 2px 10px;
      }
    }
  }
}
</style>
