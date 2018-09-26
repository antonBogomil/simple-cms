import React, {Component} from 'react';
import PropType from 'prop-types';

import axios from 'axios';
import PageViewComponent from "./PageViewComponent";
import NotFoundPageComponent from "../../errors/NotFoundPageComponent";


/***
 * Main component for rendering pages.
 * Load all pages, set pages routings
 *
 */
class PageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPagesLoaded: false,
            page: undefined
        }
    }

    componentDidMount() {
        //delete first slash becouse all urls saved wihtout slash
        const url = window.location.pathname.substr(1);

        axios.get('/api/page/get/url', {
            params: {
                url: url,
            }
        })
            .then(response => {
                this.setState({page: response.data, isPageLoaded: true});
            }).catch(exception => {
            this.setState({isPageLoaded: true});
            console.log(exception);
        });
    }


    render() {
        const {page} = this.state;
        const {isPageLoaded} = this.state;

        return (
            <div>
                {isPageLoaded ? (
                    page ? (<PageViewComponent page={page}/>) : <NotFoundPageComponent/>
                ) : null}
            </div>);

    }
}

PageComponent.propType = {
    page: PropType.object.isRequired,
};

export default PageComponent;