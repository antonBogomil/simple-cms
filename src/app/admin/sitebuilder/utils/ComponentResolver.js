// Types of page components
const ARTICLE_TYPE = "ARTICLE";
const MENU_TYPE = "MENU";


// Resolve type of component and return url for edit this component
export const resolveEditUrl = component => {
    switch (component.type) {
        case ARTICLE_TYPE: return '/admin/article/edit/' + component.id;
        case MENU_TYPE: return '/admin/menu/edit/' + component.id;
        default: return '/admin/dashboard';
    }
};

export const resolveComponentName = component =>{
    switch (component.type) {
        // Article has a title, so return it
        case ARTICLE_TYPE: return component.title;

        // In this case will return only component type name
        case MENU_TYPE: return "Menu component";
        default: return null;
    }
};