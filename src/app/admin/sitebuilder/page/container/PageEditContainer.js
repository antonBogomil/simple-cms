import React, {Component} from "react";
import {connect} from 'react-redux';
import axios from 'axios';

import {editPage, getPage} from '../action/pageActions';
import PageEditFormComponent from "../component/PageEditFormComponent";
import InfoWindow from "../../../utils/InfoWindow";

class PageEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            components: []
        }
    }


    handleUpdatePage = (page, id) => {
        const formData = new FormData();
        formData.set('title', page.title);
        formData.set('url', page.url);
        formData.set('metaKeywords', page.metaKeywords);
        formData.set('metaDescription', page.metaDescription);
        formData.set('isMainPage', page.isMainPage);
        formData.set('components', page.components.map(a => a.id));


        this.props.editPage(formData, id);
        this.props.history.goBack();
    };

    handleLoadComponents = () => {
            axios.get('/api/page/components/list')
                .then(response => response.data)
                .then(data => {
                    this.setState({components: data})
                })
    };

    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.getPage(id);
        this.handleLoadComponents();
    }

    render() {
        const {page} = this.props;

        const {open} = this.props;
        const {message} = this.props;

        const {components} = this.state;
        return (
            <div>
                <PageEditFormComponent page={page}
                                       components={components}
                                       onPageUpdate={this.handleUpdatePage}/>

                {open ? <InfoWindow open={open} message={message}/> : null}

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        page: state.pages.page,

        open: state.info.open,
        message: state.info.message
    }
};

export default connect(mapStateToProps, {editPage, getPage})(PageEditContainer);