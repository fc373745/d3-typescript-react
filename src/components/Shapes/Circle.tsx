import React from "react";

interface Props {
    width?: number;
    height?: number;
}

class Rectangle extends React.Component<Props, {}> {
    render() {
        return (
            <svg
                width={this.props.width || 600}
                height={this.props.height || 600}
            >
                <circle
                    cx={100}
                    cy={100}
                    r={50}
                    fill="blue"
                    stroke="red"
                    strokeWidth={2}
                />
            </svg>
        );
    }
}

export default Rectangle;
