import React from "react";
import {Hotspot} from "../data/hotspots";
import {Button, Grid2 as Grid} from "@mui/material";

const getPic = (pics: string[]) => {
    if (pics.length > 0) {
        return pics[0];
    }
    return "";
}

export const MapItem: any = (proj: Hotspot) => {
    const progressWidth = proj.raisedAmount/proj.target*456;

    return (
        <div  className="project-card" >
            <Grid container>
                <Grid>
                    <Grid>
                        <Grid className="title" >
                            {proj.title}
                        </Grid>
                        <Grid className="description">
                            {proj.details}
                        </Grid>
                    </Grid>
                        <svg width="600" height="1" viewBox="0 0 600 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.3" x="0.000976562" width="600" height="1" fill="white"/>
                        </svg>
                    <Grid direction="row" sx={{
                        justifyContent: "flex-end",
                        alignItems: "baseline"

                    }}>

                        <Grid className="raised">
                            {`$${proj.raisedAmount} raised`}
                        </Grid>

                        <Grid className="budget-goal">
                            {`$${proj.target} goal`}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                <div className="progress-bar" style={{width: progressWidth}}>
                    <svg width="456" height="30" viewBox="0 0 456 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.2" x="1.99902" width="454" height="30" rx="15" fill="white"/>
                    <rect x="0.000976562" width={progressWidth} height="30" rx="15" fill="#8BDA6A"/>
                </svg>

                </div>
                <Grid>
                    <img src={getPic(proj.imagesUrl)} className="img-container" alt="Location"/>
                </Grid>
            </Grid>
            <Grid  container spacing={{ xs: 2, md: 3 }} columns={12} sx ={{
                justifySelf: "flex-end",
                alignSelf: "flex-end",
                paddingRight: "25px",
            }}  >
                <Grid className="learn-more">
                    <Button className="learn-more-text" style={{color: "white"}} >
                    {"LEARN MORE"}
                    </Button>
                </Grid>
                <Grid className="donate">
                    <Button className="donate-text">
                        {"DONATE"}
                    </Button>
                </Grid>
            </Grid>
        </div>

    );
}
