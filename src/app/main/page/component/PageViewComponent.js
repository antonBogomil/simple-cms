import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

// noinspection ES6UnusedImports
import '../style/PageViewComponentStyle.css';

class PageViewComponent extends Component {


    render() {
        const {page} = this.props;
        return (
            <div>
                <Helmet>
                    <title>{page.title}</title>
                    <meta name="description" content={page.metaDescription}/>
                    <meta name="keywords" content={page.metaKeywords}/>
                </Helmet>

                {page.articles ? (
                    page.articles.map(article => {
                        return (<div key={article.id} dangerouslySetInnerHTML={{__html: article.body}}/>)
                    })
                ) : null}
            </div>

        )
    }

}

PageViewComponent.propType = {
    //
};
export default PageViewComponent;