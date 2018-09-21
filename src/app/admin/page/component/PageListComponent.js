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

class PageArticlesExpansionPanelComponent extends Component {

    render() {
        const {articles} = this.props;

        return (
            <div style={{width: '100%'}}>
                {articles === undefined || articles.length === 0 ? "No articles yet" : (
                    <Select value={-1}>
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

class PageTableHead extends Component {
    render() {
        const {isSelectAll} = this.props;
        const {onChooseAll} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={isSelectAll}
                            onChange={onChooseAll}
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

class PageTableBody extends Component {
    render() {
        const {pages} = this.props;
        const {isPageSelected} = this.props;
        const {onSelectPage} = this.props;

        return (
            <TableBody>
                {pages.map(row => {
                    const isSelected = isPageSelected(row.id);
                    return (
                        <PageTableItem key={row.id}
                                       page={row}
                                       onSelectPage={onSelectPage}
                                       isSelected={isSelected}/>
                    );
                })}
            </TableBody>
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
            <TableRow>
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
    render() {
        const {classes} = this.props;
        const {pages} = this.props;

        const {isSelectAll} = this.props;
        const {numSelected} = this.props;

        const {onSelectPage} = this.props;
        const {onSelectAll} = this.props;
        const {isPageSelected} = this.props;
        const {onDeletePages} = this.props;

        return (
            <div>
                <ContentComponent navigation="Pages / List">
                    <div>
                        <PageTableToolbar
                            select={numSelected}
                            onDelete={onDeletePages}
                        />

                        <Table className={classes.table}>
                            <PageTableHead isSelectAll={isSelectAll}
                                           onChooseAll={onSelectAll}/>

                            <PageTableBody pages={pages}
                                           onSelectPage={onSelectPage}
                                           isPageSelected={isPageSelected}/>
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

            </div>
        );
    }
}

PageListComponent.propType = {
    classes: PropType.object.isRequired,

    isSelectAll: PropType.bool.isRequired,
    numSelected: PropType.number.isRequired,

    onSelectPage: PropType.func.isRequired,
    onSelectAll: PropType.func.isRequired,
    onDeletePages: PropType.func.isRequired,
    isPageSelected: PropType.func.isRequired,

};

export default withStyles(Style)(PageListComponent);
