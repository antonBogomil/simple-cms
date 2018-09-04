import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

// noinspection ES6UnusedImports
import '../../style/page/PageViewComponentStyle.css';

class PageViewComponent extends Component {

    componentWillMount() {
        const {page} = this.props;
        document.title = page.title;
        document.getElementsByTagName("meta")[3].content = page.metaDescription;
        document.getElementsByTagName("meta")[4].content = page.metaKeywords;

    }

    render() {
        const {page} = this.props;
        return (
            <div>
                <Helmet>
                    <link rel="stylesheet" href="/static/css/main.min.css"/>
                    <script src="/static/js/scripts.min.js"/>
                    <script async type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1yN6cNWKQX2uiqLtlGPovJJ4I2ecx9G4&callback=vartaMap"/>
                </Helmet>

                { page.articles ?
                    page.articles.map(article => {
                        return (<div key={article.id} dangerouslySetInnerHTML={{__html: article.body}}/>)
                    })
                    : null}
            </div>

        )
    }

}

PageViewComponent.propType = {
    //
};
export default PageViewComponent;