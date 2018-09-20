import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {deletePage, fetchPages} from "../actions/pageActions";
import PageListComponent from "../component/PageListComponent";

class PageListContainer extends Component {


    componentWillMount() {
        this.props.fetchPages();
    }

    handleOnDeletePages = pageIds => {
        this.props.deletePage(pageIds);
    };


    render() {
        const {pages} = this.props;


        return (
            <PageListComponent pages={pages}
                               onDeletePages={this.handleOnDeletePages}/>
        )

    }

}

PageListContainer.propType = {
    fetchPages: PropTypes.func.isRequired,
    deletePage: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired
};


const mapStateToProps = state => {
    return {
        pages: state.pages.pages
    }
};

export default connect(mapStateToProps, {fetchPages, deletePage})(PageListContainer);