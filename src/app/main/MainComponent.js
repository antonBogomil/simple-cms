import React, {Component} from 'react';
import PropType from 'prop-types';

// noinspection ES6UnusedImports
import './MainComponentStyle.css';
import { Route } from "react-router-dom";
import PageComponent from "./page/component/PageComponent";


class MainComponent extends Component {

    render() {
        return (
            <div>
                {/*  site routings */}
                <Route render={(props) => <PageComponent {...props} />}/>
            </div>);
    }
}

MainComponent.propType = {
    mainPage: PropType.object.isRequired,
};

export default MainComponent;