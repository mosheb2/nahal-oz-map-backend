// src/data/hotspots.ts

import axios from 'axios';

const API_URL = 'https://nahal-oz-map-backend.vercel.app/api/locations';

export interface Hotspot {
    _id: string;
    details: string,
    title: string,
    coverImagesUrl: string,
    coordinates: {
        x: number,
        y: number
    },
    raisedAmount: number,
    target: number,
    targetCurrency: string
}

export default {
    getProjects: async () => {
        const res = await axios.get(API_URL);
        const projects = (res?.data?.locations || []).filter((p:any) => !p.deleted );
        return projects.map((p:Hotspot) => ({
            _id: p._id,
            details: p.details,
            title: p.title,
            coverImagesUrl: p.coverImagesUrl,
            coordinates: p.coordinates,
            raisedAmount: p.raisedAmount,
            target: p.target,
            targetCurrency: p.targetCurrency
        }));
    }
}
