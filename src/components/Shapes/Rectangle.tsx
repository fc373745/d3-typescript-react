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
                <rect x={0} y={0} fill="blue" width={100} height={200} />
            </svg>
        );
    }
}

export default Rectangle;
