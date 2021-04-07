<template>
    <div class="AboutInfo">
        <Nav-Status :mode="1"></Nav-Status>
        <about-Nav></about-Nav>
        <div class="aboutBody"></div>
        <Footer-Status></Footer-Status>
    </div>
</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import aboutNav from '@/components/aboutNav.vue'
    export default {
        name: "AboutInfo",
        components:{NavStatus,FooterStatus,aboutNav},


    }
</script>

<style scoped lang="scss">
.AboutInfo{
    position: relative;
    .aboutBody{
        margin-top: -5px;
        background-image: url("../../assets/images/aboutbgimg.jpg");
        height:1200px;
        width:1920px;
    }
}
</style>