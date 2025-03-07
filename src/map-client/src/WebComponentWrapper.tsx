import React from "react";
import App from "./App";
import r2wc from "react-to-webcomponent";
import ReactDOM from "react-dom/client";
import './index.css';

const MyReactComponent = (props: any) => (
    <React.StrictMode>
        <App  {...props}/>
    </React.StrictMode>
);

const NahalOzMapWebComponent = r2wc(MyReactComponent, React, ReactDOM, {
    props: {
        name: 'string',
    },
});

customElements.define(
    'nahal-oz-map-web-component',
    NahalOzMapWebComponent
);
