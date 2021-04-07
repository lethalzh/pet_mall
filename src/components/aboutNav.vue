<template>
    <div>
        <div class="aboutNav">
            <ul>
                <li v-for="(row,index) of AboutInfo" :key="index">
                    <a :href="'#aboutNav'+index">
                        <div>
                            <el-image :src="row.Aimg"></el-image>
                        </div>
                        <p>{{row.Atitle}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="aboutImg">
            <img src="../assets/images/subject.jpg">
        </div>
    </div>

</template>

<script>
    export default {
        name: "aboutNav",
        data() {
            return {
                AboutInfo: [],
            }
        },
        methods: {
            async getAboutInfo() {
                let [err, res] = await this.$apis.other.getAboutInfo();
                if (res.msg == 'success')
                    this.AboutInfo = res.data
            }
        },
        created() {
            this.getAboutInfo()
        }
    }
</script>

<style scoped lang="scss">
    .aboutNav {
        z-index: 99;
        width: 100%;
        min-width: 1060px;
        text-align: center;
        background-color: #fef8ef;
        color: #fff;
        margin-top: -15px;
        ul {
            list-style: none;
            margin-block-start: 0;
            margin-block-end: 0;
            z-index: 99;
            li {
                cursor: pointer;
                display: inline-block;
                text-align: center;
                z-index: 99;
                padding: 12px 38px 8px 38px;
                font-size: 14px;
                color: #333;
                :hover {
                    color: #248DCC;
                }
                p {
                    z-index: 99;
                    margin-block-start: 0;
                    margin-block-end: 0;
                    font-size: 12px;
                }
            }
        }
    }
    .aboutImg{
        overflow: hidden;
        margin-top: 0px;
        z-index: 0;
    }
</style>