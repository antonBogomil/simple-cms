import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../ContentComponent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


import classNames from 'classnames';

import axios from 'axios';

import Style from '../../style/page/PageListComponentStyle';
import InfoSnackBar from "../utils/InfoSnackBar";

class PageTableToolbar extends Component {
    constructor(props) {
        super(props);
    }

    handleDeletePage = () => {
        const {onDelete} = this.props;
        onDelete();
    };

    render() {
        const {select} = this.props;
        const {classes} = this.props;
        const toolbarStylee = classNames(null, {
            [classes.selectToolBar]: select > 0
        });

        return (
            <Toolbar className={toolbarStylee}>
                {select === 0 ? (
                    <Typography variant="title">
                        Pages
                    </Typography>
                ) : (

                    <div className={classes.toolBarSelected}>
                        <Typography variant="title">
                            {select} selected
                        </Typography>
                        <Tooltip title="Delete">
                            <IconButton
                                aria-label="Delete"
                                onClick={this.handleDeletePage}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>

                )}

            </Toolbar>
        )
    };
}

PageTableToolbar = withStyles(Style)(PageTableToolbar);

class PageArticlesExpansionPanelComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {articles} = this.props;

        return (
            <div style={{width: '100%'}}>
                {articles.length === 0 ? "No articles yet" : (
                    <Select value="">
                        {articles.map(article => {
                            return (<MenuItem
                                value={article.id}
                                key={article.id}
                                component={Link}
                                to={{
                                    pathname: "/admin/article/edit/" + article.id,
                                    state: {
                                        articlesOrder: articles.map(a => a.orderNumber)
                                    }
                                }}
                            >
                                {article.title}
                            </MenuItem>)
                        })}
                    </Select>
                )}

            </div>
        )
    };
}

class PageListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [],
            selected: [],
            isSelectAll: false,
            numSelected: 0,
            responseMessage: '',
        };

    }

    componentDidMount() {
        axios.get('/api/page/list')
            .then(response => {
                const pages = response.data;
                this.setState({pages: pages});
            });


    }

    handleToggleAll = () => {
        const {isSelectAll} = this.state;
        const {pages} = this.state;

        if (!isSelectAll) {
            this.setState({
                isSelectAll: true,
                selected: pages.map(n => n.id),
                numSelected: pages.length
            });
        } else {
            this.setState({
                isSelectAll: false,
                selected: [],
                numSelected: 0
            });
        }

    };

    handleSelectPage = (event, id) => {
        const {pages} = this.state;
        const {selected} = this.state;
        const {isSelectAll} = this.state;

        const isArticleChecked = selected.indexOf(id) !== -1;

        if (isArticleChecked) {
            const index = selected.indexOf(id);
            selected.splice(index, 1);

            if (isSelectAll && selected.length === 0) {
                this.setState({selected: [], isSelectAll: false});
            } else if (isSelectAll && selected.length !== pages.length) {
                this.setState({isSelectAll: false});
            }

            this.setState({selected: selected});
        } else {
            selected.push(id);

            if (!isSelectAll && selected.length === pages.length) {
                this.setState({isSelectAll: true});
            }

            this.setState({selected: selected});
        }

        this.setState({numSelected: selected.length});


    };

    handleDeletePages = () => {
        const {selected} = this.state;
        const {pages} = this.state;

        selected.map(pageId => {
            axios.delete('/api/page/delete/' + pageId)
                .then(response => {
                    const code = response.data.code;
                    if (code === 200) {
                        const page = pages.filter(p => p.id === pageId);
                        pages.splice(pages.indexOf(page), 1);
                        this.setState({pages: pages});
                    }
                }).catch(exception => {
                console.log(exception);
            })

        });

        this.setState({
            numSelected: 0,
            selected: [],
            isSelectAll: false,
            responseMessage: selected.length + " page(s) was deleted successfully"
        })
    };

    isPageSelected = id => {
        return this.state.selected.indexOf(id) !== -1;
    };

    render() {
        const {classes} = this.props;

        const {pages} = this.state;
        const {isSelectAll} = this.state;
        const {numSelected} = this.state;
        const {responseMessage} = this.state;

        const urlHostName = window.location.origin;

        return (
            <div>
                <ContentComponent navigation="Pages / List">
                    <div>
                        <PageTableToolbar
                            select={numSelected}
                            onDelete={this.handleDeletePages}
                        />
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelectAll}
                                            onChange={this.handleToggleAll}
                                        />
                                    </TableCell>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Meta Description</TableCell>
                                    <TableCell>Meta Keywords</TableCell>
                                    <TableCell>Url link</TableCell>
                                    <TableCell>Is main page</TableCell>
                                    <TableCell>Articles</TableCell>
                                    <TableCell>Create Date</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pages.map(row => {
                                    const isSelected = this.isPageSelected(row.id);
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(event) => this.handleSelectPage(event, row.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.metaDescription}</TableCell>
                                            <TableCell>{row.metaKeywords}</TableCell>
                                            <TableCell>
                                                {(!row.isMainPage && row.url === '') ? (
                                                    <Typography variant="caption" color="error">
                                                        {urlHostName}/{row.url}
                                                        <Typography variant="caption" color="error">
                                                            Only main page can have empty url!
                                                            Please edit this page and change url.
                                                        </Typography>
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="caption">
                                                        {urlHostName}/{row.url}
                                                    </Typography>
                                                )}

                                            </TableCell>
                                            <TableCell>{row.isMainPage ? "Yes" : "No"}</TableCell>
                                            <TableCell>
                                                <PageArticlesExpansionPanelComponent articles={row.articles}/>
                                            </TableCell>
                                            <TableCell>{row.createDate}</TableCell>
                                            <TableCell>
                                                <IconButton component={Link} to={{
                                                    pathname: "/admin/page/edit/" + row.id,
                                                }}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </ContentComponent>
                <div className={classes.createArticleTooltip}>
                    <Tooltip title="Create new page">
                        <Button color="secondary"
                                variant="fab"
                                component={Link}
                                to={"/admin/page/add"}>
                            <AddIcon/>
                        </Button>
                    </Tooltip>
                </div>


                {responseMessage ? (
                    <InfoSnackBar message={responseMessage}/>
                ) : ''}
            </div>
        );
    }
}

PageListComponent.propType = {
    classes: PropType.object.isRequired,
    navagition: PropType.string.isRequired,
    selected: PropType.array.isRequired,
    isSelectAll: PropType.bool.isRequired,
    numSelected: PropType.number.isRequired
};

export default withStyles(Style)(PageListComponent);
