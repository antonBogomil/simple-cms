import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import {fetchArticles} from "../../../../article/action/articleActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
        overflow: 'scroll',
        maxHeight: '600px',
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
        border: '3px dashed gray',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '5px',
        minHeight: '70px'
    },

    componentMeta: {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        const {onDrag} = this.props;
        const {menuTitle} = this.props;

        const {open} = this.state;
        return (
            <div style={{cursor: 'pointer'}}>
                <ListItem onClick={this.handleClick}>
                    <ListItemText primary={menuTitle}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            components.map((c, index) => {
                                return (
                                    <ListItem key={index} button className={classes.nested}>
                                        <ListItemText inset
                                                      primary={c.type === 'ARTICLE' ? c.title : c.type}
                                                      draggable
                                                      onDragStart={e => onDrag(e, c.type === 'ARTICLE' ? c.title : c.type)}
                                        />
                                    </ListItem>
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
        const {classes} = this.props;
        const {components} = this.props;
        const {onDrag} = this.props;

        const types = [...new Set(components.map(c => c.type))];

        return (
            <List component="nav"
                  subheader={
                      <ListSubheader component="div">Components</ListSubheader>
                  }
            >

                {
                    types.map(type => {
                        return (
                            <ComponentItemView components={components.filter(c => c.type === type)}
                                               onDrag={onDrag}
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
            pageComponents: []
        }
    }


    handleDragComponent = (event, id) => {
        event.dataTransfer.setData('id', id);
    };

    handleDropComponent = event => {
        const id = event.dataTransfer.getData('id');

        const {pageComponents} = this.state;
        pageComponents.push(id);

        this.setState({pageComponents: pageComponents});
    };

    render() {
        const {classes} = this.props;
        const {components} = this.props;

        const {pageComponents} = this.state;

        return (
            <Grid container className={classes.builderContainer}>
                <Grid item xs={2} className={classes.componentsContainer}>
                    <ComponentsListView components={components}
                                        onDrag={this.handleDragComponent}/>
                </Grid>

                <Grid item xs={10}
                      className={classes.pageContainer}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => this.handleDropComponent(e)}>

                    {pageComponents.length === 0 ? (
                        <Typography variant='title' className={classes.info}>
                            Drag and Drop components here.
                            <br></br>
                            We will save components to this page and it's order.
                        </Typography>

                    ) : (
                        pageComponents.map((c, index) => {
                            return (
                                <div key={index} className={classes.componentViewBlock}>
                                    <Typography variant="headline" className={classes.componentMeta}>
                                        {c}
                                    </Typography>
                                </div>
                            )
                        })
                    )}

                </Grid>
            </Grid>
        );
    }

}

PageEditBuilderComponent.propType = {
    articles: PropType.array.isRequired

};

const mapStateToProps = state => {
    return {
        articles: state.articles.articles
    }
};


PageEditBuilderComponent = withStyles(Style)(PageEditBuilderComponent);
export default connect(mapStateToProps, {fetchArticles})(PageEditBuilderComponent);


