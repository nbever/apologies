const SignUp = () => {

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        margin: 'auto',
        overflow: 'auto'
      }}
    >
      <Box 
        sx={{
          textAlign: 'center',
          padding: '24px',
          borderRadius: '12px',
          bgcolor: 'primary.secondary',
          maxWidth: '400px',
          maxHeight: '400px',
          margin: 'auto',
        }}
      >
        <Box>
          <img src={GameBox} height="48" width="48"/>
        </Box>
        <Box sx={buffer}><TextField id="txt_username" label="Username" value={username} onChange={setter(setUsername)}/></Box>
        <Box sx={buffer}><TextField id="txt_password" label="Password" type="password" value={password} onChange={setter(setPassword)}/></Box>
        <Box sx={buffer}><Button type="primary" onClick={loginClicked} variant="contained">Login</Button></Box>
        <Box sx={buffer}>
          <Link to="/createAccount">Sign Up</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;