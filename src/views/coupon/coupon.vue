
<template>
  <div class="box">
    <div class="contentBox" v-for="(item, index) in 7" :key="index">
      <div :class="'coupon' + (index + 1)"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.contentBox {
  background-color: #df5436;
  padding: 10px;
  border-radius: 20px;
  width: 260px;
  height: 120px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.coupon1 {
  width: 240px;
  height: 100px;

  background-color: #fdfbea;
  -webkit-mask: radial-gradient(
    circle at left center,
    transparent 20px,
    #fdfbea 20px
  );
}
.coupon2 {
  width: 240px;
  height: 100px;

  background-color: #fdfbea;
  -webkit-mask: radial-gradient(circle at 0, #0000 20px, #fdfbea 0),
    radial-gradient(circle at right, #0000 20px, #fdfbea 0);
  -webkit-mask-size: 51%;
  -webkit-mask-position: 0, 100%;
  -webkit-mask-repeat: no-repeat;
}
.coupon3 {
  width: 240px;
  height: 100px;

  background-color: #fdfbea;
  -webkit-mask: radial-gradient(circle at 20px, #0000 20px, #fdfbea 0);
}
.coupon4 {
  width: 240px;
  height: 100px;

  background-color: #fdfbea;
  -webkit-mask: radial-gradient(circle at 20px 20px, #0000 20px, #fdfbea 0);
  -webkit-mask-position: -20px -20px;
}
.coupon5 {
  width: 240px;
  height: 100px;

  background-color: #fdfbea;
  -webkit-mask: radial-gradient(circle at 20px 20px, #0000 20px, #fdfbea 0);
  -webkit-mask-position: -20px -20px;
  -webkit-mask-size: 50%;
}
.coupon6 {
  width: 240px;
  height: 100px;

  background-color: #fdfbea;
  -webkit-mask: radial-gradient(circle at 10px, #0000 10px, #fdfbea 0);
  -webkit-mask-position: -10px;
  -webkit-mask-size: 100% 30px;
}
.coupon7 {
  width: 240px;
  height: 100px;
  background-color: #fdfbea;
  -webkit-mask: radial-gradient(circle at 50%, #fdfbea 5px, transparent 0) 50%
      50% / 100% 20px,
    radial-gradient(circle at 20px 20px, transparent 20px, #fdfbea 0) -20px -20px /
      50%;
  -webkit-mask-composite: destination-out;
}
</style>
