import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Add';
import PageIcon from '@material-ui/icons/Pages';
import {Link} from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PageViewIcon from '@material-ui/icons/Pageview';
import ExitIcon from '@material-ui/icons/ExitToApp';

import React, {Component} from "react";


class MenuData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageOpen: false,
            articleOpen: false
        };
    }

    handleClickPageMenu = () => {
        this.setState(state => ({pageOpen: !state.pageOpen}));
    };

    handleClickArticleMenu = () => {
        this.setState(state => ({articleOpen: !state.articleOpen}));
    };

    render() {
        const {pageOpen} = this.state;
        const {articleOpen} = this.state;

        return (
            <div>
                <ListItem button onClick={this.handleClickPageMenu}>
                    <ListItemIcon>
                        <PageIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Pages"/>
                    {pageOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={pageOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to={"/admin/page"}>
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


                <ListItem button onClick={this.handleClickArticleMenu}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Articles"/>
                    {articleOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={articleOpen} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem button component={Link} to={"/admin/article"}>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Articles list"/>
                        </ListItem>
                        <ListItem button component={Link} to={"/admin/article/add"}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Add article"/>
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button component={Link} to={"/"} target="_blank">
                    <ListItemIcon>
                        <PageViewIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Site preview"/>
                </ListItem>

                <Divider/>

                <ListItem button component={Link} to={"/admin/logout"}>
                    <ListItemIcon>
                        <ExitIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItem>

            </div>)
    }

}

export default MenuData;

