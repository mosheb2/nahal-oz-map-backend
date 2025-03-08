import React ,{ useState } from 'react';
import './map.css';
import { Hotspot } from '../../data/hotspots';
import { MapItem } from "../map-item/MapItem";

const MAP_IMAGE = 'https://api.standwithnahaloz.com/assets/proj-images/nahal_oz_map.png';
const DEFAULT_CATEGORY = 'all';
const PROGRESS_WIDTH = 456;

function formatNumberWithKMB(num: number = 0) {
    if (Math.abs(num) >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toLocaleString('en-US');
    }
}

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

function getTotalProgress(projects: Hotspot[]) {
    return projects.reduce(
        (sum, proj) => {
            sum.totalTarget += proj.target;
            sum.totalRaised += proj.raisedAmount;
            sum.totalDonors += proj.donorsCount;
            return sum;
        },
        { totalTarget: 0, totalRaised: 0, totalDonors: 0}
    );
}

export function InteractiveMap ({ projects }:{ projects:Hotspot[]} ) {
    const [selectedCategory, setCategory] = useState(DEFAULT_CATEGORY);
    const [totalProgress, setTotalProgress] = useState({ totalTarget: 0, totalRaised: 0, totalDonors: 0 });
    const progressWidth = totalProgress.totalTarget === 0 ? 40 : Math.max(40, totalProgress.totalRaised / totalProgress.totalTarget * PROGRESS_WIDTH);

    if (totalProgress.totalTarget === 0 && projects.length > 0) {
        setTotalProgress(getTotalProgress(projects));
    }

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
            <div className="total-progress-bar">
                <h2>${totalProgress.totalRaised.toLocaleString('en-US')} raised</h2>
                <h4>
                    {`$${totalProgress.totalTarget.toLocaleString('en-US')} Goal`}<div className="dot"></div>{`${formatNumberWithKMB(totalProgress.totalDonors)} donations`}
                </h4>
                <svg width="100%" height="30" viewBox="0 0 100% 30" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.2" x="1.99902" width="100%" height="30" rx="20" fill="#9d9b98"/>
                    <rect x="0.000976562" width={progressWidth} height="30" rx="20" fill="#8BDA6A"/>
                </svg>
            </div>
        </>
    );
}


