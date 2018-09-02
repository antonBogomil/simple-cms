
import {lighten} from '@material-ui/core/styles/colorManipulator';

const style = theme => ({
    selectToolBar:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },

    toolBarSelected: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    createArticleTooltip: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        padding: '15px'
    },
});

export default style;