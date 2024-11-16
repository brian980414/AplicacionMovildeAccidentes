import { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/router'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email || !password) {
        setError('Por favor, completa todos los campos.');
      } else {
        setError('');
        console.log('Formulario enviado', { email, password });
        router.push('/home');
      }
    };

    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
              {error && (
                <Box
                  sx={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '10px',
                    marginBottom: '20px',
                    borderRadius: '4px',
                  }}
                >
                  {error}
                </Box>
              )}
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '16px' }}
              >
                Iniciar Sesión
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
}
export default Login;