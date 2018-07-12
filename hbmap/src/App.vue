<template>

    <div id="app">
        
        <div id="mapContainer"></div>

    </div>

</template>

<script>

import hbmap from "./assets/hbmap.js"
// import hbmap from "hbmap"

export default {

    name: 'App',

    data (){

        return {

            map : null,

        }

    },

    mounted () {
        
        this.map = hbmap.MapInit({
            ele : "mapContainer"
        })

        setTimeout( () => {

            // hbmap.MapMove(this.map, 116.3569, 39.1234)

        }, 1000 )

        // hbmap.MapDotToDot( this.map, [116.4040, 40.9158], [117.4563, 40.2356] );

        // hbmap.MapSwitchControl(this.map)

        // hbmap.MapAddMarker( this.map )

        hbmap.MapAddCircle( this.map, 116.3569, 39.1234, 50000, {
            strokeColor : "red"
        } )

        hbmap.MapAddPolygon(this.map, "116.3569, 39.1234; 117.3569, 39.4234; 117.3569, 38.4234;"  )

    }

}

</script>

<style scoped>

    #mapContainer{
        width: 1000px;
        height: 900px;
    }

</style>

