import React, {Component} from 'react';
import * as ReactDOM from "react-dom";


class DragItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yPosition: 0,
            areaIndex: -1
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

        if (onDragStart !== undefined) {
            onDragStart(event);
        }
    };

    handleOnDragOver = (event, params) => {
        event.preventDefault();

        const {dragOnly} = this.props;

        if (dragOnly === undefined || !dragOnly) {

            const targetNode = ReactDOM.findDOMNode(event.target);

            const offset = targetNode.offsetTop;

            if (targetNode.hasAttribute("index")) {
                const index = parseInt(targetNode.getAttribute("index"));
                this.setState({areaIndex: index});

            }


            const currentBlockHeight = event.target.clientHeight;
            const itemPosition = event.pageY - offset - currentBlockHeight;

            const yTranslition = this.resolveTranslation(itemPosition, currentBlockHeight);
            this.setState({yPosition: yTranslition});

            const {onDragOver} = this.props;
            if (onDragOver !== undefined) {
                const {areaIndex} = this.state;

                let realIndex = yTranslition === 0 ? Math.abs(areaIndex + 1) : areaIndex;
                onDragOver(event, params, realIndex);
            }

        }
    };

    handleOnDragLeave = (event, params) => {
        const {onDragLeave} = this.props;


        if (onDragLeave !== undefined) {
            onDragLeave(event, params);
        }
    };

    handleOnDragEnd = (event, params) => {
        event.preventDefault();

        const {onDragEnd} = this.props;
        if (onDragEnd !== undefined) {
            onDragEnd(event, params);
        }
    };


    resolveTranslation = (itemPosition, targetHeight) => {
        const halfBlockHeight = targetHeight / 2;
        return itemPosition < halfBlockHeight ? targetHeight : 0
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
                 index={this.props.index}>

                {children}

            </div>
        );
    }

}


export default DragItem;