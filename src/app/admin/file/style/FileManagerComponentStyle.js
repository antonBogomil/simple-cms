const styles = theme => ({
        managerPath: {
            margin: '40px 20px 0px 20px',
        },

        titleOverflow: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },

        optionsContainer: {
            paddingLeft: '20px',
            marginBottom: '40px',
        },

        fileOption: {
            marginBottom: '15px'
        },

        circleButton: {
            height: '56px',
            width: '56px',
            backgroundColor: '#3f51b5',

            "& :hover": {
                backgroundColor: '#303f9f'
            }
        },

        marginContainer: {
            marginLeft: '25px',
        },
        uploadContainer: {
            display: 'flex',
            alignItems: 'center'
        }


    })
;

export default styles;