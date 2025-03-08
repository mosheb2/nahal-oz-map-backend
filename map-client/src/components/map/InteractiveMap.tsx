import React from 'react';
import './map.css';
import { Hotspot } from '../../data/hotspots';
import { MapItem } from "../map-item/MapItem";

const mapImage = 'https://api.standwithnahaloz.com/assets/proj-images/nahal_oz_map.png';


function getTooltipPositionClass(proj: Hotspot) {
    let posClassname = '';

    if (proj.coordinates.y < 50) {
        posClassname += 'bottom'
    }

    if (proj.coordinates.x > 50) {
        posClassname += ' left';
    }

    return posClassname;
}

export function InteractiveMap ({ projects }:{ projects:Hotspot[]} ) {
    return (
        <div id="map">
            <div id="map-wrapper">
                <img className="map-bg" src={mapImage} alt="Map Image"/>
                    {projects.map((proj: Hotspot) => {
                        return (
                            <div key={proj._id} className="map-marker" style={{top: `${proj.coordinates.y}%`, left: `${proj.coordinates.x}%`}}>
                                <div className={`marker-campaign ${getTooltipPositionClass(proj)}`}>
                                    <MapItem {...proj}/>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}


