import React, {Component} from 'react';
import PropType from 'prop-types';

import {connect} from 'react-redux';

import {updateArticle, getArticle} from '../action/articleActions';
import {fetchPages} from "../../page/action/pageActions";
import InfoWindow from "../../../utils/InfoWindow";
import ArticleEditFormComponent from "../component/ArticleEditFormComponent";

class ArticleEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: true,
        }
    }

    handleUpdateArticle = article => {
        const articleData = new FormData();
        articleData.set('id', article.id);
        articleData.set('title', article.title);
        articleData.set('body', article.body);

        this.props.updateArticle(articleData, article.id);
        this.props.history.goBack();
    };


    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.getArticle(id)
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.article) {
            this.setState({isDataLoad: true});
        }

    };

    render() {
        const {article} = this.props;


        const {open} = this.props;
        const {message} = this.props;

        const {isDataLoad} = this.state;

        return (
            isDataLoad ? (
                <div>
                    <ArticleEditFormComponent article={article}
                                              onUpdate={this.handleUpdateArticle}/>
                    {open ? (
                        <InfoWindow open={open}
                                    message={message}/>
                    ) : null}

                </div>
            ) : null
        );
    }
}

ArticleEditContainer.propType = {
    article: PropType.object.isRequired,

    updateArticle: PropType.func.isRequired,
    fetchPages: PropType.func.isRequired,

};

const mapStateToProps = state => {
    return {
        article: state.articles.article,

        open: state.info.open,
        message: state.info.message
    }
};


export default connect(mapStateToProps, {updateArticle, getArticle})(ArticleEditContainer);
