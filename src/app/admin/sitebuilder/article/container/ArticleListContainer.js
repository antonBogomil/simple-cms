import React, {Component} from 'react';
import PropType from 'prop-types';
import ArticleListComponent from "../component/ArticleListComponent";
import InfoWindow from "../../../utils/InfoWindow";

import {connect} from 'react-redux';
import {fetchArticles, deleteArticles} from "../action/articleActions";

class ArticleListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            isSelectAll: false,
            numSelected: 0,
            isDataLoad: false
        }
    }

    handleSelectAll = () => {
        const {articles} = this.props;

        const {isSelectAll} = this.state;

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
        const {articles} = this.props;

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

        this.props.deleteArticles(selected);

        this.setState({
            selected: [],
            isSelectAll: false,
            numSelected: 0
        });
    };

    componentWillMount() {
        if(!this.props.articles || this.props.articles.length === 0) {
            this.props.fetchArticles();
        }else{
            this.setState({isDataLoad: true})
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.articles) {
            this.setState({isDataLoad: true});
        }
    };

    render() {
        const {articles} = this.props;

        const {open} = this.props;
        const {message} = this.props;

        const {isSelectAll} = this.state;
        const {numSelected} = this.state;
        const {isDataLoad} = this.state;

        return (
            isDataLoad ? (
                <div>
                <ArticleListComponent articles={articles}
                                      numSelected={numSelected}
                                      isSelectAll={isSelectAll}
                                      onSelectAll={this.handleSelectAll}
                                      onSelect={this.handleSelectArticle}
                                      onDelete={this.handleDeleteArticles}
                                      isArticleSelected={this.isArticleSelected}/>

                    {open ? (
                        <InfoWindow open={open} message={message}/>
                    ): null}
                </div>
            ) : null
        )
    }

}

ArticleListContainer.propType = {
    fetchArticles: PropType.func.isRequired
};


const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
        //for dialog
        open: state.info.open,
        message: state.info.message
    }
};

export default connect(mapStateToProps, {fetchArticles, deleteArticles})(ArticleListContainer)