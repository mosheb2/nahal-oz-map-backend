import React from 'react';
import './map-item.css';
import { Hotspot } from '../data/hotspots';

const PROGRESS_WIDTH = 456;

// TODO: Use actual image once we have it
const getPic = (pics: string[]) => {
    return 'https://placehold.co/455x228';
    // if (pics.length > 0) {
    //     return pics[0];
    // }
    // return "";
}

export const MapItem: any = (proj: Hotspot) => {
    const progressWidth = Math.max(40, proj.raisedAmount / proj.target * PROGRESS_WIDTH);

    return (
        <div className="project-card">
            <h2 className="title">
                {proj.title}
            </h2>
            <p className="description">
                {proj.details}
            </p>
            <svg width="456" height="1" viewBox="0 0 456 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.3" x="0.000976562" width="456" height="1" fill="white"/>
            </svg>
            <div className="raised">
                {`$${proj.raisedAmount} raised`}
            </div>
            <div className="budget-goal">
                {`$${proj.target} goal`} <div className="dot"></div>  1K donations
            </div>
            <div className="progress-bar">
                <svg width={PROGRESS_WIDTH} height="30" viewBox={`0 0 ${PROGRESS_WIDTH} 30`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.2" x="1.99902" width={PROGRESS_WIDTH} height="30" rx="15" fill="white"/>
                    <rect x="0.000976562" width={progressWidth} height="30" rx="15" fill="#8BDA6A"/>
                </svg>
            </div>
            <img src={getPic(proj.imagesUrl)} className="img-container" alt="Project img"/>
            <div className="card-footer">
                <button className="cta">
                    DONATE
                </button>
                <button className="cta black-cta">
                    LEARN MORE
                </button>
            </div>
        </div>

    );
}
