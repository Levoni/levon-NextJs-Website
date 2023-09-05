import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name:'Levon Site',
        short_name:'Levon Site',
        description:'App Created by Levon for games and tools',
        start_url:'/',
        display:'standalone',
        background_color:'#fff',
        theme_color:'#fff',
        icons:[
            {
            src:'/favicon.ico',
            sizes:'any',
            type:'/image/x-icon',
            },
        ],
    }
}