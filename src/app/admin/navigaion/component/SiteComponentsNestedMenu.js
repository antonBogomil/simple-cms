import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Apps';


const Style = theme => ({
    active: {
        color: '#3f51b5'
    },

    subMenuMargin: {
        marginLeft: '10px'
    }

});

class SiteComponentsNestedMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: '',
            open: false
        };
    }

    handleActiveMenu = (event, menuItem) => {
        const {active} = this.state;
        const {open} = this.state;
        const isClose = active === menuItem && open;

        this.setState({
            active: isClose ? null : menuItem,
            open: !isClose
        });
    };


    render() {
        const {classes} = this.props;
        const {active} = this.state;
        const {open} = this.state;

        return (
            <div className={classes.subMenuMargin}>
                {/* Aricle component menu*/}
                <ListItem button
                          onClick={event => this.handleActiveMenu(event, 'articles')}>

                    <ListItemIcon className={active === 'articles' ? classes.active : null}>
                        <InboxIcon/>
                    </ListItemIcon>

                    <ListItemText primary="Article"/>
                    {active === 'articles' && open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>

                <Collapse in={active === 'articles' && open}
                          timeout="auto"
                          unmountOnExit>

                    <List component="div"
                          disablePadding>

                        <ListItem button
                                  component={Link}
                                  to={"/admin/article"}>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Article list"/>
                        </ListItem>
                        <ListItem button component={Link} to={"/admin/article/add"}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Add article"/>
                        </ListItem>
                    </List>
                </Collapse>


                <ListItem button
                          onClick={event => this.handleActiveMenu(event, 'menu')}>

                    <ListItemIcon className={active === 'menu' ? classes.active : null}>
                        <MenuIcon/>
                    </ListItemIcon>

                    <ListItemText primary="Menu"/>
                    {active === 'menu' && open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>

                <Collapse in={active === 'menu' && open}
                          timeout="auto"
                          unmountOnExit>

                    <List component="div"
                          disablePadding>

                        <ListItem button
                                  component={Link}
                                  to={"/admin/menu"}>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Menu list"/>
                        </ListItem>
                        <ListItem button component={Link} to={"/admin/menu/add"}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Add menu"/>
                        </ListItem>
                    </List>
                </Collapse>


            </div>)
    }

}

export default withStyles(Style)(SiteComponentsNestedMenu);

