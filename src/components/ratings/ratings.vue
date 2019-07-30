<template>
<div class="ratings">
  <div class="ratings-content">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrap">
          <span class="title">服务态度</span>
          <!-- <star :size="36" :score="seller.serviceScore"></star> -->
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrap">
          <span class="title">商品评分</span>
          <star :size="36" :score="seller.foodScore"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrap">
          <span class="title">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
      <ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @select="onSelect" @toggle="onToggle"></ratingselect>
      <div class="ratings-wrap">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item" :key="index"></li>
        </ul>
      </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow:hidden;

</style>
