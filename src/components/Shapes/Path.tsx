import React from "react";

interface Props {
    width?: number;
    height?: number;
}

class Line extends React.Component<Props, {}> {
    render() {
        return (
            <svg
                width={this.props.width || 600}
                height={this.props.height || 600}
            >
                {/*
                    M - MOVE TO
                    L - LINE TO
                    Z - CLOSEPATH
                    H - HORIZONTAL LINETO
                    V - VERTIAL LINETO
                    C - CURVETO
                    S - SMOOTH CURVETO
                */}
                <path
                    d="M 150 0 L 75 200 L 225 200 C 225 200 150 150 150 50"
                    fill="orange"
                />
            </svg>
        );
    }
}

export default Line;
