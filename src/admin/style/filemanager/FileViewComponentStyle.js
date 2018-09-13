
const style = theme => ({

    viewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        margin: '10px',
        wordBreak: 'break-word',
        height: '150px',

        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(63, 81, 181, 0.08)'
        },
    },


    iconStyle: {
        transform: "scale(2,2)",
        height: '45px',
        width: '45px'
    },

    saveIcon: {
        transform: "scale(1.5, 1.5)",
        height: '45px',
        width: '45px'
    },

    fileLabel: {
        marginTop: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }

});


export default style;