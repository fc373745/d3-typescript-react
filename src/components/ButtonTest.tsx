import React from 'react'

interface Props {
    text?: string
}

const initialState = { text: "hello there"}
type State = typeof initialState

class ButtonTest extends React.Component<Props, State> {

    state: State = this.props.text ? { text: this.props.text }: initialState

    onClick = () => {
        this.setState({text: "wtf"})
        console.log('wtf')
    }

    render(){
        return (
            <div> 
                <h1>{this.state.text}</h1>
                <button onClick={this.onClick} >
                    Change Text
                </button>
            </div>
        )
    }
}

export default ButtonTest