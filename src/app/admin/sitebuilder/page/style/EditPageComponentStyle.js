const style = theme => ({
    mainFormWrapper: {
        padding: '25px'
    },

    formStyle: {
        paddingTop: '5px',
        width: '100%',
    },

    button: {
        margin: theme.spacing.unit,
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '15px'
    },

    marginDiv: {
        marginBottom: "25px"
    },

    chipsContainer: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'row'
    },

    chip: {
        margin: theme.spacing.unit / 2,
    },

    hostNameAdornment: {
        marginRight: '0px',
        color: 'rgb(169, 169, 169);'
    }

});


export default style;