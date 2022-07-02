<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <Rank></Rank>
        <Like></Like>
        <Floor 
        v-for="(floor) in floorList" 
        :key="floor.id"
        :floorList="floor"
        ></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
    name:'Home',
    components:{
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    computed:{
        ...mapState({
            floorList: state => state.home.floorList
        })
    },
    mounted() {
        this.$store.dispatch('getfloorList');
        //将用户信息展示到home
        this.$store.dispatch('getUserInfo');
    },
}
</script>

<style lang="less">

</style>