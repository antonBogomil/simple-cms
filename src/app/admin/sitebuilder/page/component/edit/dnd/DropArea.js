import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class DropArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topOffset: null
        }
    }

    handleDragOver = event => {
        event.preventDefault();

        const {topOffset} = this.state;



        const {onDragOver} = this.props;

        if(onDragOver !== undefined){
            onDragOver(event, topOffset);
        }
    };

    handleOnDrop = event => {
        let data = {};

        // Cannot read data, so dragabble object invalid
        try {
            data = JSON.parse(event.dataTransfer.getData("data"));
        }catch (e) {
           return;
        }

        const {type} = this.props;
        if (data.type === type) {
            this.props.onDrop(event, data.data);
        }

    };


    componentDidMount = () => {
        const node = ReactDOM.findDOMNode(this);
        this.setState({topOffset: node.offsetTop})
    };

    render() {
        const {className} = this.props;
        const {children} = this.props;


        return (
            <div onDrop={this.handleOnDrop}
                 onDragOver={this.handleDragOver}
                 className={className}>
                {children}
            </div>
        );
    }

}


export default DropArea;