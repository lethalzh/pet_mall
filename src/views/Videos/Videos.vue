<template>
    <div class="Videos">
        <Nav-Status :mode="1"></Nav-Status>
        <Video-Nav></Video-Nav>

        <div class="VideoBody" v-for="(titem,index) of videoList" :key="index">
            <div class="vidTitle" :id="'toy'+index">
                <b><i :class="$getState('cache','Animal')=='dog'?'dogi':'cati'"></i>{{titem.title}}</b>
                <a href="#toy1"></a>
            </div>
            <div class="VideoTabl">
                <div class="videotd" v-for="(vitem,j) of titem.list" :key="j">
                    <My-Video :Vurl="vitem.v_url" :Iurl="vitem.v_img"></My-Video>
                    <div class="vCont">
                        <span class="ml10">{{vitem.v_name}}</span>
                        <span class="mr10"><i class="el-icon-view"></i>{{vitem.v_see}}</span>
                    </div>
                </div>
            </div>
        </div>
        <Footer-Status></Footer-Status>
    </div>
</template>
<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import MyVideo from '@/components/MyVideo.vue'
    import VideoNav from './VideoNav.vue'

    export default {
        name: 'Videos',
        components: {NavStatus, FooterStatus, VideoNav, MyVideo},
        data() {
            return {
                videoList: []
            }
        },
        methods: {
            async getVideoList() {
                let [err, res] = await this.$apis.other.getVideoList();
                if (res.msg == 'success') {
                    // this.videoList = res.data
                    let type = '', i = -1;
                    for (let item of res.data) {
                        if (type != item.v_type) {
                            i++;
                            type = item.v_type;
                            this.videoList[i] = {title: item.v_type, list: [item]}

                        } else {
                            this.videoList[i].list.push(item)
                        }
                    }
                    this.videoList = Array.from( this.videoList);
                    console.log(this.videoList, '1----------------this.videoList', Array.from( this.videoList))
                }
            }
        },
        created() {
            this.getVideoList();
            console.log(this.videoList, '2----------------this.videoList', Array.from( this.videoList))
        }
    }
</script>
<style scoped lang="scss">
    .Videos {
        .VideoBody {
            width: 1200px;
            margin: 0 auto;
            padding-bottom: 20px;
            margin-top: 20px;

            .vidTitle {
                height: 22px;
                background: url(../../assets/images/cmall-titBg.png) 0 50% repeat-x;
                b {
                    height: 22px;
                    background: #fff;
                    line-height: 22px;
                    font-size: 18px;
                    padding: 0 18px 0 0;
                }

                i {
                    background: url(../../assets/images/cmall-ico.png) 0 0 no-repeat;
                    display: inline-block;
                    width: 7px;
                    height: 18px;
                    margin-right: 18px;
                    vertical-align: -2px;
                }

                .dogi {
                    background-position: -29px -39px;
                }

                .cati {
                    background-position: -129px -39px;
                }
            }

            .VideoTabl {
                display: flex;
                flex-wrap: wrap;

                .videotd {
                    margin: 18px 0 0 18px;

                    .vCont {
                        display: flex;
                        justify-content: space-between;
                        height: 40px;
                        background: #f2f2f2;
                        line-height: 40px;
                        color: #333;
                        padding: 0 10px;

                        .ml10 {
                            margin-left: 15px;
                            line-height: 40px;
                            color: #333;
                            font-size: 12px;
                        }

                        .mr10 {
                            margin-right: 15px;
                            color: #999;
                            font-size: 12px;
                            line-height: 40px;

                            i {
                                font-size: 16px;
                                vertical-align: middle;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>