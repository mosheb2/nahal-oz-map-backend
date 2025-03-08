// src/data/hotspots.ts

import axios from 'axios';

const API_URL = 'https://nahal-oz-map-backend.vercel.app/api/locations';

export interface Hotspot {
    _id: string;
    details: string,
    title: string,
    categoryName: string,
    coverImagesUrl: string,
    coordinates: {
        x: number,
        y: number
    },
    raisedAmount: number,
    target: number,
    donorsCount: number,
    projPageLinkUrl: string,
    donatePageLinkUrl: string,
}

export default {
    getProjects: async () => {
        const res = await axios.get(API_URL);
        const projects = (res?.data?.locations || []).filter((p:any) => !p.deleted );
        return projects.map((p:Hotspot) => ({
            _id: p._id,
            details: p.details,
            title: p.title,
            categoryName: p.categoryName,
            coverImagesUrl: p.coverImagesUrl,
            coordinates: p.coordinates,
            raisedAmount: p.raisedAmount,
            target: p.target,
            donorsCount: p.donorsCount,
            projPageLinkUrl: p.projPageLinkUrl,
            donatePageLinkUrl: p.donatePageLinkUrl,
        }));
    }
}
