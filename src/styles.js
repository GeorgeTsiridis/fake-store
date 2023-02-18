import { makeStyles } from '@material-ui/core/styles';

// style used to make only the list scrollable with the top bar being fixed
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)', // 64px is the height of the navbar
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    grid: {
        width: '100%',
        margin: '0'
    },
    productDescription: {
        height: '15vh',
        overflowY: 'auto',
        padding: '0em 0em 0.5em 0em'
    },
    productTitle: {
        height: '150px'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardActions: {
        justifyContent: 'center',
    }
}));

export default useStyles;