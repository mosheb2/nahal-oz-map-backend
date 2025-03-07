import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

import hotspots, { Hotspot } from './data/hotspots';
import {InteractiveMap} from './components/map/InteractiveMap';


// A type for our hotspots

function App() {
    const [projects, setProjects] = useState<Hotspot[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await hotspots.getProjects(); // Call the imported function
                setProjects(result);
                console.log(result);
            } catch (err) {
                console.error(err)
            }
        }

        fetchData();

    }, []);
    return (
        <div className="App">
          <InteractiveMap projects={projects}/>
        </div>
    );
}

export default App;
