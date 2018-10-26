import React, {Component} from 'react';



class DragItem extends Component {


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
            const {onDragOver} = this.props;
            if (onDragOver !== undefined) {
                onDragOver(event, params);
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



    render() {
        const {className} = this.props;
        const {children} = this.props;
        const {draggable} = this.props;

        return (
            <div onDragStart={draggable ? this.handleOnDragStart : undefined}
                 onDragEnd={this.handleOnDragEnd}
                 onDragLeave={this.handleOnDragLeave}
                 onDragOver={this.handleOnDragOver}
                 draggable={draggable}
                 className={className}
                 style={this.props.style}
                 index={this.props.index}>

                {children}

            </div>
        );
    }

}


export default DragItem;