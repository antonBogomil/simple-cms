const styles = theme => ({
        managerPath: {
            margin: '40px 20px 0px 20px',
        },

        titleOverflow: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },

        folderContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexFlow: 'row wrap',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            marginBottom: '40px',
            minHeight: '500px',
            height: '500px'
        },

        emptyFolderAlert: {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
        },

        optionsContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingLeft: '20px',
            marginBottom: '40px'
        },

        managerOption: {
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgba(63, 81, 181, 0.08)'
            },
        },

        iconSize: {
            transform: "scale(2,2)",
            height: '20px',
            width: '20px'
        },

        folderInput: {
            marginLeft: '10px',
        }

    })
;

export default styles;