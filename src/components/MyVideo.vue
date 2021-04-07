<template>
    <div>
        <video :id="vid" class="video-js">
        </video>
    </div>
</template>

<script>
    import {createRandomId} from '@/utils/index.js'
    export default {
        name: "MyVideo",
        props:{
            Vurl:{
                type:String,
                default:''
            },
            Iurl:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                player: null,
                vid:''
            }
        },
        created(){
            this.vid='video'+createRandomId()

        },
        mounted() {
            this.initVideo()
        },
        methods: {
            initVideo() {
                //初始化视频方法
                let myPlayer = this.$video(this.vid, {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    poster:this.Iurl||"//vjs.zencdn.net/v/oceans.png",
                    //自动播放属性,muted:静音播放
                    autoplay: false,
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    muted: false,
                    //设置视频播放器的显示宽度（以像素为单位）
                    width: "382px",
                    //设置视频播放器的显示高度（以像素为单位）
                    height: "218px",
                    sources:[ // 视频源
                        {
                            src: this.Vurl||'//vjs.zencdn.net/v/oceans.mp4',
                            type: 'video/mp4',
                        }]

                });
            }
        }
    }
</script>

<style scoped>

</style>