import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import useStayScrolled from 'react-stay-scrolled';


const Chat = props => {
  const {socket, getUsers, auth} = props;
  const [users, setUsers] = React.useState([]);
  const [socketCreated, setSocketCreated] = React.useState(false);
  const divRef = React.useRef();
  const {stayScrolled} = useStayScrolled(divRef);
  const [messages, setMessages] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [lastReceived, setLastReceived] = React.useState('');

  React.useLayoutEffect(() => {
    stayScrolled();
  }, [messages.length]);

  React.useEffect(() => {
    console.log('creating socket');
    if (!socketCreated) {
      setSocketCreated(true);
      socket.on('receiveMessage', (data) => {
        messages.push(data);
        setMessages(messages);
        setLastReceived(data);
      });
      socket.on('allUsers', (data) => {
        const allUsers = data.users;
        setUsers(allUsers);
        console.log(allUsers);
      });

    }
    setUsers(getUsers());
  }, []);

  const sendMessage = () => {
    const message = {user: auth.username, contents: currentMessage};
    messages.push(message);
    setMessages(messages);
    socket.emit('sendMessage', message);
    setLastReceived({user: auth.username, contents: currentMessage});
    setCurrentMessage('');
  };

  return (
    <Paper style={{backgroundColor: '#2f3463', padding: 8, height: '100%', maxHeight: 500}}>
      <Grid container spacing={1} justify={'center'} alignItems={'flex-start'}>
        <Grid item xs={12}>
          <Typography style={{color: '#fff'}}>
            Chat {socket ? "Connected" : "Loading"}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <div style={{
            width: '100%',
            minHeight: 200,
            maxHeight: 300,
            height: '100%',
            overflow: 'auto',
          }}
               ref={divRef}
          >

            {messages ? messages.map((message, index) => (
              <Typography key={index} style={{color: '#fff'}}>
                {message.user}: {lastReceived ? message.contents : null}
              </Typography>
            )) : null}

          </div>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{color: '#fff'}}>
            Connected Users:
          </Typography>
          {users.map(user => (
            <Typography style={{fontSize: 12, color: '#fff'}}>
              {user}
            </Typography>
          ))}
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