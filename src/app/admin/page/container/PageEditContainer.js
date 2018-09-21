import React, {Component} from "react";
import {connect} from 'react-redux';

import {editPage, getPage} from '../actions/pageActions';
import PageEditFormComponent from "../component/PageEditFormComponent";

class PageEditContainer extends Component {

    handleUpdatePage = (page, id) => {
        const formData = new FormData();
        formData.set('title', page.title);
        formData.set('url', page.url);
        formData.set('metaKeywords', page.metaKeywords);
        formData.set('metaDescription', page.metaDescription);
        formData.set('isMainPage', page.isMainPage);
        formData.set('articles', page.articles.map(a => a.id));


        this.props.editPage(formData, id);
        this.props.history.push('/admin/page');
    };

    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.getPage(id);
    }

    render() {
        const {page} = this.props;

        return (
            <PageEditFormComponent page={page}
                                   onPageUpdate={this.handleUpdatePage}/>
        )
    }

}

const mapStateToProps = state => {
    return {
        page: state.pages.page
    }
};

export default connect(mapStateToProps, {editPage, getPage})(PageEditContainer);