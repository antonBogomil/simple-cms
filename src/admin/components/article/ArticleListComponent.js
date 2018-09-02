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
import axios from 'axios';


import Style from '../../style/article/ArticleListComponentStyle';

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

class ArticleListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            selected: [],
            isSelectAll: false,
            numSelected: 0,
        };
    }

    handleToggleAll = () => {
        const {isSelectAll} = this.state;
        const {articles} = this.state;

        if (!isSelectAll) {
            this.setState({
                isSelectAll: true,
                selected: articles.map(n => n.id),
                numSelected: articles.length
            });
        } else {
            this.setState({
                isSelectAll: false,
                selected: [],
                numSelected: 0
            });
        }

    };

    handleSelectArticle = (event, id) => {
        const {articles} = this.state;
        const {selected} = this.state;
        const {isSelectAll} = this.state;

        const isArticleChecked = selected.indexOf(id) !== -1;

        if (isArticleChecked) {
            const index = selected.indexOf(id);
            selected.splice(index, 1);

            if (isSelectAll && selected.length === 0) {
                this.setState({selected: [], isSelectAll: false});
            } else if (isSelectAll && selected.length !== articles.length) {
                this.setState({isSelectAll: false});
            }

            this.setState({selected: selected});
        } else {
            selected.push(id);

            if (!isSelectAll && selected.length === articles.length) {
                this.setState({isSelectAll: true});
            }

            this.setState({selected: selected});
        }

        this.setState({numSelected: selected.length});


    };

    isArticleSelected = id => {
        return this.state.selected.indexOf(id) !== -1;
    };

    handleDeleteArticles = () => {
        const {selected} = this.state;
        const {articles} = this.state;

        selected.forEach(articleId => {
            axios.delete('/api/article/delete/' + articleId)
                .then(response => {

                    const code = response.data.code;

                    if (code === 200) {
                        const article = articles.filter(a => a.id === articleId);
                        const index = articles.indexOf(article);

                        articles.splice(index, 1);
                        this.setState({articles: articles});
                    }

                }).catch(exception => {
                console.log(exception);
            })
        });

        this.setState({
            selected: [],
            isSelectAll: false,
            numSelected: 0
        });
    };

    componentDidMount() {
        axios.get('/api/article/list')
            .then(response => {
                let articles = response.data;

                articles.sort((a, b) => {
                    return a.orderNumber > b.orderNumber
                });

                this.setState({
                    articles: articles
                });
            });

    }

    render() {
        const {classes} = this.props;

        const {articles} = this.state;
        const {isSelectAll} = this.state;
        const {numSelected} = this.state;

        return (
            <div>
                <ContentComponent navigation="Article / List">
                    <div>
                        <ArticleTableToolbar
                            select={numSelected}
                            onDelete={this.handleDeleteArticles}
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
                                    <TableCell>Create Date</TableCell>
                                    <TableCell>Parent page</TableCell>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {articles.map(row => {
                                    const isSelected = this.isArticleSelected(row.id);
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(event) => this.handleSelectArticle(event, row.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.createDate}</TableCell>

                                            <TableCell>
                                                {row.page ? (
                                                    <Typography
                                                        component={Link}
                                                        to={'/admin/page/edit/' + row.page.id}
                                                    >
                                                        {row.page.title}
                                                    </Typography>
                                                ) : 'No parent page yet'}
                                            </TableCell>

                                            <TableCell>{row.orderNumber}</TableCell>

                                            <TableCell>
                                                <IconButton component={Link} to={{
                                                    pathname: "/admin/article/edit/" + row.id,
                                                    state: {
                                                        articlesOrder: articles.map(a => a.orderNumber)
                                                    }
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
    selected: PropType.array.isRequired,
    isSelectAll: PropType.bool.isRequired,
    numSelected: PropType.number.isRequired
};

export default withStyles(Style)(ArticleListComponent);
