<template>

    <div id="app">
        
        <div id="mapContainer"></div>

    </div>

</template>

<script>

// import hbmap from "./assets/hbmap.js"
import hbmap from "hbmap"

export default {

    name: 'App',

    data (){

        return {

            map : null,
            marker : null,

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

        this.marker = hbmap.MapAddMarker( this.map, 116.3569, 39.1234, false, true )

        // hbmap.MapMarkerIsAnimate( this.marker, true )

        hbmap.MapAddCircle( this.map, 116.3569, 39.1234, 50000, {
            strokeColor : "red"
        } )

        // hbmap.MapAddPolygon(this.map, "116.1234, 39.1234; 116.2341, 39.2234;", {}, true  )

        //hbmap.MapSetScale( this.map, 8 )

        hbmap.MapAddTextLabel( this.marker, "asdf", 116.3569, 39.1234, {width:300}, "block" );

        // hbmap.MapAddBoundary(this.map, "山西省太原市万柏林区")

        // hbmap.MapInfoWindow( this.map, {}, 116.3569, 39.4234 )

        hbmap.MapRightMenu( this.marker, [{

            text : "12234",
            callback : () => {
                alert(1)
            }

        }] )

        hbmap.MapAddrToLngLat( "山西省太原市万柏林区和平南路16号", "太原市" ).then( (data) => {

            console.log( data );

        } )

        hbmap.MapLngLatToAddr( hbmap.Point( 112.518016, 37.860284 ) ).then( (data) => {

            console.log( data );

        } )

    }

}

</script>

<style scoped>

    #mapContainer{
        width: 800px;
        height: 600px;
    }

</style>

