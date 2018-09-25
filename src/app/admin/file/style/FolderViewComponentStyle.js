const style = theme => ({
    folderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexFlow: 'row wrap',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        marginBottom: '40px',
        minHeight: '500px',
        height: '500px',
        overflow: 'overlay'
    },

    emptyFolderAlert: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },

});

export default style;