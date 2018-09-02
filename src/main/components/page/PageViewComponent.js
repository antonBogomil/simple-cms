import React, {Component} from 'react';

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

                {(page.articles) ?
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