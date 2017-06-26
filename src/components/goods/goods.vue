<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper"> 
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
                    <div class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</div>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodWrapper"> 
            <ul>
                <li v-for="item in goods"  class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="hood in item.foods" class="food-item border-1px">
                            <img :src="hood.icon" alt="" width="57" height="57" class="icon">
                            <div class="content">
                                <h2 class="name">{{hood.name}}</h2>
                                <p class="desc">{{hood.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{hood.sellCount}}份</span>
                                    <span>好评率{{hood.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">{{hood.price}}</span>
                                    <span v-show="hood.oldPrice" class="old">{{hood.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopcart from '../shopcart/shopcart.vue'
    const ERR_OK = 0;
    export default{
         name: 'goods',
         props:{
             seller: {
                 type: Object
             }
         },
         data() {
             return {
                 goods :[],
                 listHeight :[],
                 scrollY :0
             }
         },
         computed: {
            currentIndex() {
                for(let i=0;i<this.listHeight.length; i++){
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    if(!height2 ||(this.scrollY >= height1 && this.scrollY < height2)){
                        return i;
                    }
                }
                return 0;
            }
         },
         created() {
            this.classMap = ['decrease','discount','special','invoice','guarantee'];
             this.axios.get('/api/goods').then((response) => {
                 if (response.data.errno ===ERR_OK) {
                     this.goods = response.data.data;
                     this.$nextTick(() => {
                        this. _initScroll();
                        this. _calculateHeight();
                     })
                    console.log(this.goods)
                 }
             })
         },
         methods: {
             selectMenu (index,event){
                if (!event._constructed){
                    return; 
                }
                 console.log(index);
                 let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                 let els = foodList[index];
                 this.foodsSCroll.scrollToElement(els,300);
             },
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click: true
                });
                this.foodsSCroll = new BScroll(this.$refs.foodWrapper,{
                    probeType: 3
                });
                this.foodsSCroll.on('scroll', (pos) =>{
                    this.scrollY =Math.abs( Math.round(pos.y));
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for(let i=0;i<foodList.length; i++){
                    let item = foodList[i];
                    height +=item.clientHeight;
                    this.listHeight.push(height);
                }
            }
         },
         components :{
             shopcart
         }
    }

</script>

<style scoped lang="stylus"> 
    @import "../../common/stylus/mixin.styl";
    .goods
        display flex
        position:absolute
        width:100%
        top:178px
        bottom:46px
        overflow:hidden
        .menu-wrapper
            flex:0 0 80px
            width:80px
            background:#f3f5f7
            .menu-item
                display:table
                width:56px
                height:54px
                line-height:14px
                padding:0 12px
                &.current
                    position:relative;
                    z-index:10
                    margin-top:-1px
                    background:#fff
                    font-weight:700
                    .text
                        border-none()
                .text
                    display table-cell
                    width 56px
                    vertical-align middle
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size 12px
                    .icon
                        display inline-block
                        width 12px
                        height 12px
                        vertical-align top
                        margin-right 4px
                        background-size 12px 12px
                        background-repeat no-repeat
                        &.decrease
                          bg-image('decrease_3')
                        &.discount
                          bg-image('discount_3')
                        &.guarantee
                          bg-image('guarantee_3')
                        &.invoice
                          bg-image('invoice_3')
                        &.special
                          bg-image('special_3')
        .foods-wrapper
            flex:1
            .title
                padding-left:14px
                height:26px
                line-height:26px
                border-left:2px solid #d9dde1
                font-size:12px
                color:rgb(147,153,159)
                background:#f3f5f7
            .food-item
                display:flex
                margin:18px
                padding-bottom:18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom:0
                .icon
                    flex:0 0 57px
                    margin-right:10px
                .content
                    flex:1
                    .name
                        margin:2px 0 8px 0
                        height:14px
                        line-height:14px
                        font-size:14px
                        color:rgb(7,17,27)
                    .desc
                        margin-bottom:8px
                        font-size:10px
                        color:rgb(147,153,159)
                    .extra
                        line-height:10px
                        color:rgb(147,153,159)
                        font-size:10px
                        .count
                            margin-right:6px
                    .price
                        font-weight:700
                        line-height:24px
                        .now
                            margin-right:8px
                            font-size:14px
                            color:rgb(240,20,20)
                        .old
                            text-decoration:line-through
                            font-size:10px
                            color:rgb(147,153,159)
</style>/n
