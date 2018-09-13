import green from '@material-ui/core/colors/green';

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
            height: '500px',
            overflow: 'overlay'
        },

        emptyFolderAlert: {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
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

            "& :hover":{
                backgroundColor: '#303f9f'
            }
        },

        folderInput: {
            marginLeft: '25px',
        },

    })
;

export default styles;