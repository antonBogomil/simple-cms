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


import Style from '../style/PageListComponentStyle';
import InfoSnackBar from "../../utils/InfoSnackBar";


class PageArticlesExpansionPanelComponent extends Component {

    render() {
        const {articles} = this.props;

        return (
            <div style={{width: '100%'}}>
                {articles.length === 0 ? "No articles yet" : (
                    <Select>
                        <MenuItem value="" disabled>
                            Choose an article
                        </MenuItem>
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


class PageTableToolbar extends Component {

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


class PageTableHead extends Component {

    handleChooseAll = () => {
        this.props.onChooseAll();
    };

    render() {
        const {isSelectAll} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={isSelectAll}
                            onChange={this.handleChooseAll}
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
        );
    }
}


class PageTableItem extends Component {
    render() {
        const urlHostName = window.location.origin;

        const {page} = this.props;
        const {isSelected} = this.props;
        const {onSelectPage} = this.props;


        return (
            <TableRow key={page.id}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isSelected}
                        onChange={(event) => onSelectPage(event, page.id)}
                    />
                </TableCell>
                <TableCell>{page.id}</TableCell>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.metaDescription}</TableCell>
                <TableCell>{page.metaKeywords}</TableCell>
                <TableCell>
                    {(!page.isMainPage && page.url === '') ? (
                        <Typography variant="caption" color="error">
                            {urlHostName}/{page.url}
                            <Typography variant="caption" color="error">
                                Only main page can have empty url!
                                Please edit this page and change url.
                            </Typography>
                        </Typography>
                    ) : (
                        <Typography variant="caption">
                            {urlHostName}/{page.url}
                        </Typography>
                    )}

                </TableCell>
                <TableCell>{page.isMainPage ? "Yes" : "No"}</TableCell>
                <TableCell>
                    <PageArticlesExpansionPanelComponent articles={page.articles}/>
                </TableCell>
                <TableCell>{page.createDate}</TableCell>
                <TableCell>
                    <IconButton component={Link} to={{
                        pathname: "/admin/page/edit/" + page.id,
                    }}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
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

    handleToggleAll = () => {
        const {isSelectAll} = this.state;
        const {pages} = this.props;

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
        const {pages} = this.props;

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
        const {onDeletePages} = this.props;
        onDeletePages(selected);

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
        const {pages} = this.props;

        const {isSelectAll} = this.state;
        const {numSelected} = this.state;
        const {responseMessage} = this.state;

        return (
            <div>
                <ContentComponent navigation="Pages / List">
                    <div>
                        <PageTableToolbar
                            select={numSelected}
                            onDelete={this.handleDeletePages}
                        />

                        <Table className={classes.table}>
                            <PageTableHead isSelectAll={isSelectAll}
                                           onChooseAll={this.handleToggleAll}/>

                            <TableBody>
                                {pages.map(row => {
                                    const isSelected = this.isPageSelected(row.id);
                                    return (
                                        <PageTableItem key={row.id}
                                                       page={row}
                                                       onSelectPage={this.handleSelectPage}
                                                       isSelected={isSelected}/>
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
                    <InfoSnackBar timeOut={2000} message={responseMessage}/>
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
