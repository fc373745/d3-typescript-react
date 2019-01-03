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
                <line
                    x1={100}
                    y1={100}
                    x2={120}
                    y2={300}
                    stroke="grey"
                    stroke-width={2}
                />
            </svg>
        );
    }
}

export default Line;
