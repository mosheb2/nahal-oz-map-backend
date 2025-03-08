import React ,{ useState } from 'react';
import './map.css';
import { Hotspot } from '../../data/hotspots';
import { MapItem } from "../map-item/MapItem";

const MAP_IMAGE = 'https://api.standwithnahaloz.com/assets/proj-images/nahal_oz_map.png';
const DEFAULT_CATEGORY = 'all';

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
    const [selectedCategory, setCategory] = useState(DEFAULT_CATEGORY);

    function getMyCategoryClass(category: string) {
        if (selectedCategory !== DEFAULT_CATEGORY) {
            if (selectedCategory === category) {
                return `${category}-bg`;
            }
            else {
                return 'not-active'
            }
        }

        return `${category}-bg`;
    }

    function onCategoryClick (category: string) {
        return () => {
            if (selectedCategory === category) {
                setCategory(DEFAULT_CATEGORY);
            }
            else {
                setCategory(category);
            }
        }
    }

    return (
        <>
            <div className="filters-bar">
                <button className="btn filter-btn" onClick={() => setCategory(DEFAULT_CATEGORY)}>
                    ALL
                </button>
                <button className="btn filter-btn youth-bg" onClick={onCategoryClick('youth')}>
                    YOUTH
                </button>
                <button className="btn filter-btn agriculture-bg" onClick={onCategoryClick('agriculture')}>
                    AGRICULTURE
                </button>
                <button className="btn filter-btn community-bg" onClick={onCategoryClick('community')}>
                    COMMUNITY
                </button>
                <button className="btn filter-btn education-bg" onClick={onCategoryClick('education')}>
                    EDUCATION
                </button>
            </div>
            <div id="map-wrapper">
                <img className="map-bg" src={MAP_IMAGE} alt="Map"/>
                    {projects.map((proj: Hotspot) => {
                        return (
                            <div
                                key={proj._id}
                                className={`map-marker ${getMyCategoryClass(proj.categoryName)}`}
                                style={{top: `${proj.coordinates.y}%`, left: `${proj.coordinates.x}%`}}
                            >
                                <div className={`marker-campaign ${getTooltipPositionClass(proj)}`}>
                                    <MapItem {...proj}/>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    );
}


