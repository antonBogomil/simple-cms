import React, {Component} from 'react';
import PropType from 'prop-types';

import axios from 'axios';
// noinspection ES6UnusedImports
import '../style/MainComponentStyle.css';
import PageViewComponent from "./page/PageViewComponent";


class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPagesLoaded: false,
            mainPage: {}
        }
    }

    componentDidMount() {
        axios.get('/api/page/main/get')
            .then(response => {
                this.setState({mainPage: response.data, isPageLoaded: true});
            }).catch(exception => {
            console.log(exception);
        });
    }


    render() {
        const {mainPage} = this.state;
        const {isPageLoaded} = this.state;
        return (
            <div>
                {isPageLoaded ? (
                    mainPage.length !== 0 ? (
                        <PageViewComponent page={mainPage}/>
                    ) : null
                ) : "Page is under constructions"}
            </div>);
    }
}

MainComponent.propType = {
    mainPage: PropType.object.isRequired,
};

export default MainComponent;