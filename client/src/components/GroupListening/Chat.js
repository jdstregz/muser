import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import useStayScrolled from 'react-stay-scrolled';


const Chat = props => {
  const {socket} = props;
  const divRef = React.useRef();
  const {stayScrolled} = useStayScrolled(divRef);
  const [messages, setMessages] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [lastReceived, setLastReceived] = React.useState('');

  React.useLayoutEffect(() => {
    stayScrolled();
  }, [messages.length]);

  React.useEffect(() => {
    socket.on('receiveMessage', (data) => {
      const newMessages = messages;
      newMessages.push(data);
      setMessages(newMessages);
      setLastReceived(data);
    })
  }, [messages, socket])

  const sendMessage = () => {
    const newMessages = messages;
    newMessages.push({contents: currentMessage});
    setMessages(newMessages);
    socket.emit('sendMessage', {contents: currentMessage});
    setLastReceived({contents: currentMessage});
    console.log(messages)
    setCurrentMessage('');
  };

  return (
    <Paper style={{backgroundColor: '#2f3463', padding: 8, height: '100%', maxHeight: 500}}>
      <Grid container spacing={1} justify={'center'} alignItems={'center'}>
        <Grid item xs={12}>
          <Typography style={{color: '#fff'}}>
            Chat {socket ? "Connected" : "Loading"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{
            width: '100%',
            minHeight: 200,
            maxHeight: 300,
            height: '100%',
            overflow: 'auto',
          }}
               ref={divRef}
          >
            {messages.map((message, index) => (
              <Typography key={index} style={{color: '#fff'}}>
                {lastReceived ? message.contents : null}
              </Typography>
            ))}

          </div>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant={'filled'}
            value={currentMessage}
            onChange={event => setCurrentMessage(event.target.value)}
            InputProps={{inputProps: {style: {backgroundColor: '#fff'}}}}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                sendMessage();
              }
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => sendMessage()}
            fullWidth
            style={{backgroundColor: '#69be42'}} variant={'contained'}>send</Button>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default Chat;