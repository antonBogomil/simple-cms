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
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import classNames from 'classnames';


import Style from '../style/ArticleListComponentStyle';

class ArticleTableToolbar extends Component {

    deleteArticles = () => {
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
                        Articles
                    </Typography>
                ) : (

                    <div className={classes.toolBarSelected}>
                        <Typography variant="title">
                            {select} selected
                        </Typography>
                        <Tooltip title="Delete">
                            <IconButton
                                aria-label="Delete"
                                onClick={this.deleteArticles}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>

                )}

            </Toolbar>
        )
    };
}

ArticleTableToolbar = withStyles(Style)(ArticleTableToolbar);


class ArticleTableItem extends Component {
    render() {
        const {articles} = this.props;
        const {article} = this.props;

        const {isSelected} = this.props;

        const {onSelect} = this.props;

        return (
            <TableRow key={article.id}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isSelected}
                        onChange={(event) => onSelect(event, article.id)}
                    />
                </TableCell>
                <TableCell>{article.id}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.createDate}</TableCell>

                <TableCell>
                    {article.page ? (
                        <Typography
                            component={Link}
                            to={'/admin/page/edit/' + article.page.id}
                        >
                            {article.page.title}
                        </Typography>
                    ) : 'No parent page yet'}
                </TableCell>

                <TableCell>{article.orderNumber}</TableCell>

                <TableCell>
                    <IconButton component={Link} to={{
                        pathname: "/admin/article/edit/" + article.id,
                        state: {
                            articlesOrder: articles.map(a => a.orderNumber)
                        }
                    }}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}

class ArticleTableHead extends Component {

    render() {
        const {isSelectAll} = this.props;
        const {onSelectAll} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={isSelectAll}
                            onChange={onSelectAll}
                        />
                    </TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Create Date</TableCell>
                    <TableCell>Parent page</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Edit</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

class ArticleTableBody extends Component {
    render() {

        const {articles} = this.props;
        const {isArticleSelected} = this.props;

        const {onSelect} = this.props;

        return (
            <TableBody>
                {articles.map(row => {
                    const isSelected = isArticleSelected(row.id);
                    return (
                        <ArticleTableItem key={row.id}
                                          articles={articles}
                                          article={row}
                                          isSelected={isSelected}
                                          onSelect={onSelect}/>
                    );
                })}
            </TableBody>
        );
    }
}

class ArticleListComponent extends Component {

    render() {
        const {classes} = this.props;

        const {articles} = this.props;
        const {isSelectAll} = this.props;
        const {numSelected} = this.props;

        const {onSelectAll} = this.props;
        const {onSelect} = this.props;
        const {onDelete} = this.props;
        const {isArticleSelected} = this.props;


        return (
            <div>
                <ContentComponent navigation="Article / List">
                    <div>
                        <ArticleTableToolbar
                            select={numSelected}
                            onDelete={onDelete}
                        />

                        <Table className={classes.table}>
                            <ArticleTableHead
                                isSelectAll={isSelectAll}
                                onSelectAll={onSelectAll}
                            />

                            <ArticleTableBody articles={articles}
                                              isArticleSelected={isArticleSelected}
                                              onSelect={onSelect}
                            />
                        </Table>
                    </div>
                </ContentComponent>

                <div className={classes.createArticleTooltip}>
                    <Tooltip title="Create new article">
                        <Button color="secondary"
                                variant="fab"
                                component={Link}
                                to={"/admin/article/add"}>
                            <AddIcon/>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

ArticleListComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,

    articles: PropType.array.isRequired,
    isSelectAll: PropType.bool.isRequired,
    numSelected: PropType.number.isRequired,

    onSelectAll: PropType.func.isRequired,
    onSelect: PropType.func.isRequired,
    onDelete: PropType.func.isRequired,
    isSelected: PropType.func.isRequired,


};

export default withStyles(Style)(ArticleListComponent);
