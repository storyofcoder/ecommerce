import React from "react";

function PageLoader(props) {
    return <>
        <div className="loader_container">
            <div className="loader" style={props.text?{top:'48%'}:{}}>
                <svg>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" result="gooey" />
                            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                        </filter>
                    </defs>
                </svg>
                
            </div>
            {props.text == true &&
            <div className="loader_text" >
            E COM
        </div>
            }
            
        </div>
    </>
}

export default PageLoader