import React, {Component} from 'react';
import PropType from 'prop-types';
import ArticleAddFormComponent from "../component/ArticleAddFormComponent";
import InfoWindow from "../../utils/InfoWindow";

import {connect} from 'react-redux';
import {createArticle} from "../action/articleActions";
import {fetchPages} from "../../page/action/pageActions";
import AlertDialogComponent from "../../utils/AlertDialogComponent";

class ArticleAddContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: true
        }
    }

    handleCreateArticle = article => {
        const formArticle = new FormData();

        for (const key in article) {
            if (article.hasOwnProperty(key)) {
                formArticle.set(key, article[key]);
            }
        }
        this.props.createArticle(formArticle);
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.pages) {
            this.setState({isDataLoad: true});
        }
    };

    componentWillMount() {
        //Fetch pages if redux pages state are empty
        if(!this.props.pages || this.props.pages.length === 0){
            this.props.fetchPages();
        }

    }

    render() {
        const {pages} = this.props;

        const {open} = this.props;
        const {message} = this.props;

        const {isDataLoad} = this.state;

        return (
            isDataLoad ? (

                <div>
                    <ArticleAddFormComponent pages={pages}
                                             onCreate={this.handleCreateArticle}/>

                    {pages.length === 0 ? (
                        <AlertDialogComponent
                            redirectTo={'/admin/page'}
                            title="Article creation problem"
                            helpMessage="There are no pages created.
                            Ar first you have to create the page."
                        />
                    ) : null}

                    {open ? (
                        <InfoWindow open={open} message={message}/>
                    ) : null}
                </div>

            ) : null
        );
    }
}

ArticleAddContainer.propType = {
    createArticle: PropType.func.isRequired
};


const mapStateToProps = state => {
    return {
        pages: state.pages.pages,
        //for dialog
        open: state.info.open,
        message: state.info.message
    }
};

export default connect(mapStateToProps, {createArticle, fetchPages})(ArticleAddContainer)