<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img src="" width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟
                </div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[1].type]"></span>
                    <span class="text">{{seller.supports[1].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail()">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="right-btn"> > </i>
            </div>
        </div>
        <div class="notice-wrapper" @click="showDetail">
            <span class="notice-title"></span>
            <span class="notice-text">{{seller.bulletin}}</span>
            <i class="right-btn1"> > </i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow" transition="fade">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h2 class="brand-name">{{seller.name}}</h2>
                        <star :size="48" :score="seller.score"></star>
                        <div class="tittle">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports">
                            <li class="support-item" v-for="item in seller.supports">
                                <span class="icon" :class="classMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="tittle">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="notice">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="detaiHide">
                    <i class="close-btn">x</i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import star from '../star/star.vue';
    export default {
        name: 'header',
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false
            }
        },
        methods: {
            showDetail() {
                this.detailShow = true
            },
            detaiHide() {
                this.detailShow = false
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'ecipical', 'invoice', 'guarantee']
        },
        components: {
            star
        }
    }

</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/mixin.styl";
    @import "./head.styl";
</style>/n