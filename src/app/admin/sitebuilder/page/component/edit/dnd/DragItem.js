import React, {Component} from 'react';
import * as ReactDOM from "react-dom";


class DragItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yPosition: 0
        }

    }

    handleOnDragStart = event => {
        const {data} = this.props;
        const {type} = this.props;

        const transferData = {
            'data': data,
            'type': type
        };

        event.dataTransfer.setData("data", JSON.stringify(transferData));

        const {onDragStart} = this.props;
        onDragStart(event);
    };

    handleOnDragOver = (event, params) => {
        event.preventDefault();

        event.preventDefault();

        const offset = ReactDOM.findDOMNode(event.target).offsetTop;
        const currentBlockHeight = event.target.clientHeight;
        const itemPosition = event.pageY - offset - currentBlockHeight;

        console.log(offset - currentBlockHeight);

        const yTranslition = this.resolveTranslation(itemPosition, currentBlockHeight);


        this.setState({yPosition: yTranslition});
        //
        //
        // const {onDragOver} = this.props;
        // if (onDragOver !== undefined) {
        //     onDragOver(event, params);
        // }

    };

    handleOnDragLeave = (event, params) => {
        const {onDragLeave} = this.props;

        if (onDragLeave !== undefined) {
            onDragLeave(event, params);
        }
    };

    resolveTranslation = (itemPosition, targetHeight) => {
        const halfBlockHeight = targetHeight / 2;
        return itemPosition < halfBlockHeight ? targetHeight : 0
    };


    handleOnDragEnd = (event, params) => {
        event.preventDefault();

        const {onDragEnd} = this.props;

        if (onDragEnd !== undefined) {
            onDragEnd(event, params);
        }
    };

    render() {
        const {className} = this.props;

        const {children} = this.props;
        const {draggable} = this.props;

        const {yPosition} = this.state;

        return (
            <div onDragStart={draggable ? this.handleOnDragStart : undefined}
                 onDragEnd={this.handleOnDragEnd}
                 onDragLeave={this.handleOnDragLeave}
                 onDragOver={this.handleOnDragOver}
                 draggable={draggable}
                 className={className}
                 style={yPosition ? {transform: `translate3d(0, ${yPosition}px, 0)`} : null}
            >
                {children}
            </div>
        );
    }

}


export default DragItem;