import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Add';
import PageIcon from '@material-ui/icons/Pages';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PageViewIcon from '@material-ui/icons/Pageview';
import ExitIcon from '@material-ui/icons/ExitToApp';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import BuilderIcon from '@material-ui/icons/Build';
import SiteComponentsNestedMenu from "./SiteComponentsNestedMenu";


const Style = theme => ({
    active: {
        color: '#3f51b5'
    },

});

class MenuData extends Component {
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
            <div>
                <ListItem button
                          onClick={event => this.handleActiveMenu(event, 'pages')}>

                    <ListItemIcon className={active === 'pages' ? classes.active : null}>

                        <PageIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Pages"/>
                    {active === 'pages' && open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>

                <Collapse in={active === 'pages' && open}
                          timeout="auto"
                          unmountOnExit>

                    <List component="div"
                          disablePadding>

                        <ListItem button
                                  component={Link}
                                  to={"/admin/page"}>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Pages list"/>
                        </ListItem>
                        <ListItem button component={Link} to={"/admin/page/add"}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Add page"/>
                        </ListItem>
                    </List>
                </Collapse>


                <ListItem button
                          onClick={event => this.handleActiveMenu(event, 'components')}>

                    <ListItemIcon className={active === 'components' ? classes.active : null}>
                        <BuilderIcon/>
                    </ListItemIcon>

                    <ListItemText primary="Site builder"/>
                    {active === 'components' && open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>

                <Collapse in={active === 'components' && open}
                          timeout="auto"
                          unmountOnExit>

                    <List component="div"
                          disablePadding>

                        <SiteComponentsNestedMenu/>

                    </List>
                </Collapse>


                <ListItem button
                          component={Link} to={"/admin/files"}
                          onClick={event => this.handleActiveMenu(event, 'files')}>

                    <ListItemIcon className={active === 'files' ? classes.active : null}>
                        <PermMediaIcon/>
                    </ListItemIcon>
                    <ListItemText primary="File manager"/>
                </ListItem>

                <ListItem button component={Link} to={"/"} target="_blank">
                    <ListItemIcon>
                        <PageViewIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Site preview"/>
                </ListItem>

                <Divider/>

                <ListItem button
                          component={Link} to={"/admin/logout"}
                          onClick={event => this.handleActiveMenu(event, 'logout')}>

                    <ListItemIcon className={active === 'logout' ? classes.active : null}>
                        <ExitIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>

                </ListItem>

            </div>)
    }

}

export default withStyles(Style)(MenuData);

