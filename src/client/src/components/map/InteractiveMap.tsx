import React from 'react';
import './map.css';
import { Hotspot } from '../../data/hotspots';
import { MapItem } from "../../map-item/MapItem";

const mapImage = 'https://api.standwithnahaloz.com/assets/nahal_oz_map-min.png';

export function InteractiveMap ({ projects }:{ projects:Hotspot[]} ) {
    return (
        <div id="map">
            <div id="map-wrapper">
                <img className="map-bg" src={mapImage} alt="Map Image"/>
                    {projects.map((proj: Hotspot) => {
                        return (
                            <div key={proj._id} className="map-marker" style={{top: `${proj.coordinates.y}%`, left: `${proj.coordinates.x}%`}}>
                                <div className="marker-campaign bottom">
                                    <MapItem {...proj}/>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}


