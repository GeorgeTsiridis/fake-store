import { makeStyles, Theme } from '@material-ui/core/styles';

// custom shared styles used in different components
const useStyles = makeStyles((theme: Theme) => ({
    // style used to make only the list scrollable with the top bar being fixed
    root: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)', // 64px is the height of the navbar
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    grid: {
        width: '100%',
        margin: '5px'
    },
    productDescription: {
        height: '15vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        whiteSpace: 'break-spaces',
        padding: '0em 0em 0.5em 0em'
    },
    productTitle: {
        height: '160px'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardActions: {
        justifyContent: 'center'
    },
    justifyContentEnd: {
        justifyContent: 'end'
    },
    cardMedia: {
        paddingTop: '1em'
    },
    cardContent: {
        flexGrow: 1
    },
    filterButtonsDiv: {
        display: 'flex',
        justifyContent: 'end'
    },
    filterButton: {
        margin: '5px'
    }
}));

export default useStyles;