import React, {Component} from 'react';
import PropType from 'prop-types';
import ArticleAddFormComponent from "../component/ArticleAddFormComponent";
import InfoWindow from "../../../utils/InfoWindow";

import {connect} from 'react-redux';
import {createArticle} from "../action/articleActions";

class ArticleAddContainer extends Component {


    handleCreateArticle = article => {
        const formArticle = new FormData();

        for (const key in article) {
            if (article.hasOwnProperty(key)) {
                formArticle.set(key, article[key]);
            }
        }
        this.props.createArticle(formArticle);
    };


    render() {
        const {open} = this.props;
        const {message} = this.props;

        return (
            <div>
                <ArticleAddFormComponent onCreate={this.handleCreateArticle}/>

                {open ? (
                    <InfoWindow open={open} message={message}/>
                ) : null}
            </div>

        );
    }
}

ArticleAddContainer.propType = {
    createArticle: PropType.func.isRequired,

    open: PropType.bool.isRequired,
    message: PropType.string.isRequired
};


const mapStateToProps = state => {
    return {
        //for dialog
        open: state.info.open,
        message: state.info.message
    }
};

export default connect(mapStateToProps, {createArticle})(ArticleAddContainer)