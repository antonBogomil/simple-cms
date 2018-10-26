import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DropArea from "../dnd/DropArea";
import DragItem from "../dnd/DragItem";
import * as ReactDOM from "react-dom";

// Set constant HEIGHT of view drop block.
const dropItemHeight = 80;

const Style = theme => ({
    builderContainer: {
        minHeight: '600px',
        paddingTop: '20px'
    },

    componentsContainer: {},

    pageContainer: {
        backgroundColor: '#f4f5f7',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
        overflow: 'auto',
        maxHeight: '600px',
        flexGrow: '3',
    },

    info: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        border: '3px dashed gray',
        borderRadius: '5px',
        padding: '30px'
    },

    componentViewBlock: {
        display: 'flex',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '5px',
        minHeight: dropItemHeight + 'px',
        backgroundColor: '#c6efef',
        transition: 'transform 400ms'
    },

    componentMeta: {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },


});

class ComponentItemView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };


    render() {
        const {classes} = this.props;
        const {components} = this.props;
        const {menuTitle} = this.props;


        const {open} = this.state;
        return (
            <div style={{cursor: 'pointer', overflow: 'auto'}}>
                <ListItem onClick={this.handleClick}>
                    <ListItemText primary={menuTitle}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            components.map((c, index) => {
                                return (
                                    <DragItem key={index}
                                              type='component'
                                              data={c}
                                              draggable={true}
                                              dragOnly={true}
                                              onDragOver={undefined}>

                                        <ListItem button className={classes.nested}>
                                            <ListItemText inset primary={c.title}/>
                                        </ListItem>

                                    </DragItem>
                                )
                            })
                        }

                    </List>
                </Collapse>
            </div>
        );
    }
}

ComponentItemView = withStyles(Style)(ComponentItemView);

class ComponentsListView extends Component {

    render() {
        const {components} = this.props;

        const types = [...new Set(components.map(c => c.type))];

        return (
            <List component="nav"
                  subheader={
                      <ListSubheader component="div">Components</ListSubheader>
                  }>

                {
                    types.map((type, index) => {
                        return (
                            <ComponentItemView key={index}
                                               components={components.filter(c => c.type === type)}
                                               menuTitle={type}/>
                        )
                    })
                }

            </List>

        );
    }
}


class PageEditBuilderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageComponents: [],
            insertIndex: -1,
            yPosition: 0
        }
    }

    handleAreaOnDropComponent = (event, data) => {
        const {pageComponents} = this.state;

        const {insertIndex} = this.state;


        if (insertIndex === -1) {
            pageComponents.push(data);
        } else {
            pageComponents.splice(insertIndex, 0, data);
        }

        this.setState({
            pageComponents: pageComponents,
            insertIndex: -1,
            yPosition: 0
        });
    };

    handleAreaOnDragOver = (event, offset) => {
        // const currentBlockHeight = event.target.clientHeight;
        const itemPosition = event.pageY - offset - event.target.children[0].clientHeight;
        const yTranslition = this.resolveTranslation(itemPosition, dropItemHeight);
        this.setState({yPosition: yTranslition});

    };


    handleItemOnDragOver = event => {
        const targetNode = ReactDOM.findDOMNode(event.target);

        const offset = targetNode.offsetTop;

        const currentBlockHeight = event.target.clientHeight;
        const itemPosition = event.pageY - offset - currentBlockHeight;

        const yTranslition = this.resolveTranslation(itemPosition, currentBlockHeight);
        this.setState({yPosition: yTranslition});

        const {yPosition} = this.state;
        if (targetNode.hasAttribute("index")) {
            const index = parseInt(targetNode.getAttribute("index"));
            let realIndex = yPosition === 0 ? Math.abs(index + 1) : index;
            this.setState({insertIndex: realIndex});
        }

    };


    resolveTranslation = (itemPosition, targetHeight) => {
        const halfBlockHeight = targetHeight / 2;
        return itemPosition < halfBlockHeight ? targetHeight : 0;
    };


    render() {
        const {classes} = this.props;
        const {components} = this.props;

        const {pageComponents} = this.state;

        const {insertIndex} = this.state;
        const {yPosition} = this.state;
        return (
            <Grid container className={classes.builderContainer}>
                <Grid item xs={2} className={classes.componentsContainer}>
                    <ComponentsListView components={components}/>
                </Grid>

                <DropArea type='component'
                          onDrop={this.handleAreaOnDropComponent}
                          onDragOver={this.handleAreaOnDragOver}
                          className={classes.pageContainer}>

                    {pageComponents.length === 0 ? (
                        <Typography variant='title'
                                    className={classes.info}>
                            Drag and Drop components here.
                            <br></br>
                            We will save components to this page and it's order.
                        </Typography>

                    ) : (
                        pageComponents.map((c, index) => {
                            return (
                                <DragItem key={c.id + index + new Date() + c.createDate}
                                          index={index}
                                          className={classes.componentViewBlock}
                                          draggable={false}
                                          onDragOver={this.handleItemOnDragOver}
                                          style={index >= insertIndex ?
                                              yPosition ? {transform: `translate3d(0, ${yPosition}px, 0)`} : null
                                              : null}>

                                    <Typography variant="headline" className={classes.componentMeta}>
                                        {c.title}
                                    </Typography>
                                </DragItem>
                            )
                        })
                    )}

                </DropArea>


            </Grid>
        );
    }

}

PageEditBuilderComponent.propType = {
    articles: PropType.array.isRequired

};


PageEditBuilderComponent = withStyles(Style)(PageEditBuilderComponent);
export default (PageEditBuilderComponent);


