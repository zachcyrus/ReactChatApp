import { makeStyles } from '@material-ui/core/styles';
import {io} from "socket.io-client";
import Paper from '@material-ui/core/Paper';
import SendText from './sendText'
import {useState, useEffect, useRef} from 'react';

import Message from './message';

const endPoint = 'http://localhost:8000';

const useStyles = makeStyles({
    messageContainer: {
      padding: '1rem'
    }
  });

const Messages = ({room, user}) => {
    const classes = useStyles();
    const socketRef = useRef();
    
    const [texts, setTexts] = useState([])

    useEffect(() => {
        socketRef.current = io(endPoint)
        socketRef.current.emit('join room', {
            roomName: room,
            userName: user.userName
        })

        socketRef.current.on('message received', (message) => {
            console.log(message)
            setTexts((texts) => [...texts, message])
            console.log(texts)
        })
    }, [])

    const updateMessages = (newText) => {
        newText.userId = socketRef.current.id
        newText.room = room;
        socketRef.current.emit('message sent', newText)
    }
    
    return (
        <Paper className={classes.messageContainer}>
            {texts.map(text => {
                 if(text.userId === socketRef.current.id){
                    text.user = 'Me';
                }
                else{
                    text.user = 'Other'
                }
                return (
                    <Message message={text}/>
                )
            })}
            <SendText updateMessages={updateMessages}/>
        </Paper>
    )
}

export default Messages;