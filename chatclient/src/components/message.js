import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    messageText:{
        padding: '0.5rem'
    }
  });


const Message = ({message}) => {
    const classes = useStyles();
    let change = message.user === 'Me' ? {textAlign: 'right', marginLeft:'auto'} : {textAlign: 'left'};
    return (
        <div style={change} className="message">
            {message.user}
            <Paper className={classes.messageText} >
                {message.Message}
            </Paper>

        </div>
    )
}

export default Message;