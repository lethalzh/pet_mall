<template>
    <div class="VideoNav" :class="$getState('cache','Animal')=='dog'?'dogbg':'catbg'">
        <div class="Nav">
            <a href="#toy0">
                 <span :class="$getState('cache','Animal')=='dog'?'dogbgc':'catbgc'">
                    <img class="vertical mr5"
                         src="https://img2.epetbar.com/nowater/2017-08/14/14/d2edac6ca561043c0995efc778f9379a.png"
                         width="39" height="29">
                    奇异玩具
                </span>
            </a>
            <a href="#toy1">
                 <span :class="$getState('cache','Animal')=='dog'?'dogbgc':'catbgc'">
                    <img class="vertical mr5"
                     src="https://img2.epetbar.com/nowater/2017-08/14/13/5beffa3595128f7e0c9d8741d38ac32d.png"
                     width="39" height="29">
                    吃货必备
                 </span>
            </a>
            <a href="#toy2">
                 <span :class="$getState('cache','Animal')=='dog'?'dogbgc':'catbgc'">
                <img class="vertical mr5"
                     src="https://img2.epetbar.com/nowater/2017-08/14/13/fc4298d0c922335325716e148322af19.png"
                     width="39" height="29">
                潮流出行
            </span>
            </a>
            <a href="#toy3">
                 <span :class="$getState('cache','Animal')=='dog'?'dogbgc':'catbgc'">
                <img class="vertical mr5"
                     src="https://img2.epetbar.com/nowater/2017-08/14/13/7622b019db326f8739081b72aa33e3c1.png"
                     width="39" height="29">
            家居生活
            </span>
            </a>

        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoNav",
        data() {
            return {}
        },

    }
</script>

<style scoped lang="scss">
    .VideoNav {
        height: 83px;
        margin-top: -15px;
        background: #fbf9f8 url(../../assets/images/cmall-bg1.png) no-repeat;

        .dogbg {
            background-position: 50% 0
        }

        .catbg {
            background-position: 50% -93px;
        }

        .Nav {
            width: 1000px;
            padding: 28px 0 0;
            margin: 0 auto;

            span {
                margin: 0 0 0 32px;
                font-size: 16px;
                vertical-align: middle;
                font-weight: 400;
                color: #666;
                cursor: pointer;
            }

            img {
                vertical-align: middle;
            }

            .dogbgc:hover {
                color: #46ab50;
            }

            .catbgc:hover {
                color: #e63f85;
            }
        }

    }
</style>