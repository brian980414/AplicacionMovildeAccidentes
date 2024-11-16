import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import {AddLocationAlt, Menu } from '@mui/icons-material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { MapContainer, TileLayer, Marker,Circle , Popup, Polyline } from 'react-leaflet';
import { Avatar, TextField, Select, Snackbar, Grid, FormControl, MenuItem, InputLabel, Box, AppBar, Toolbar, Typography, IconButton, Button, Modal } from '@mui/material';

import 'leaflet/dist/leaflet.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height:"80%",
  bgcolor: 'background.paper',
  overflow:"scroll",
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius:"15px",
  p: 4,
};

const polyline = [
  [4.7475779,-74.0906472],
  [4.7436287,-74.0925548],
  [4.7463577,-74.0965338],
  [4.7361361,-74.1000859],
  [4.7279618,-74.1010258],
  [4.7234041,-74.0983577],
  [4.7158144,-74.0926414],
  [4.6954035,-74.1061543],
  [4.6872520,-74.0949048],
  [4.6774180,-74.0859615],
]

const Resports = ({reason, lat, lng, descripcion, img, date}) => {
    return(
      <Marker  position={[lat,lng]}>
      <Circle
        center={{lat:lat,lng:lng}}
        pathOptions={{ fillColor: 'black',color:"red" }}
        radius={80}
      />
          <Popup>
              <Grid display={"flex"} direction={"column"}>
                <Grid justifyContent={"end"} display={"flex"}>
                  <Typography variant="p" textAlign={"end"} color="initial">{date}</Typography>
                </Grid>
                <Grid display={"flex"} alignItems={"center"}>
                  <Avatar alt="Avatar" src={img} sx={{ width: 70, height: 70, marginRight: 2 }} />
                  <Typography variant="p" fontWeight={"bold"} fontSize={20} color="initial">{reason}</Typography>
                </Grid>
                <Typography variant="p" color="initial">{descripcion}</Typography>
              </Grid>
          </Popup>
      </Marker>
    )
}

const ResportsDetail = ({reason, descripcion, img, date, address, close,id}) => {
    const Clicfunction = (reason) => {
      close(reason,id)
    }
    return(
      <Grid display={"flex"} direction={"column"} sx={{border:2,px:3,py:0.5,borderRadius:"15px"}}>
        <Grid justifyContent={"end"} display={"flex"} alignItems={"center"}>
          <Typography variant="p" textAlign={"end"} color="initial">{date}</Typography>
          <IconButton aria-label="delete" onClick={() => Clicfunction(reason)}>
            <DeleteIcon sx={{fontSize:"15px", color:"red"}} />
          </IconButton>
        </Grid>
        <Grid display={"flex"} alignItems={"center"}>
          <Avatar alt="Avatar" src={img} sx={{ width: 70, height: 70, marginRight: 2 }} />
          <Grid display={"flex"} direction={"column"}>
            <Typography variant="p" fontWeight={"bold"} fontSize={20} color="initial">{reason}</Typography>
            <Typography fontSize={"12px"} variant="p" color="initial">{address}</Typography>
          </Grid>
        </Grid>
        <Typography variant="p" ml={10} color="initial">{descripcion}</Typography>
      </Grid>
    )
}

//[4.7022946,-74.1016026]
export default function Home() {
 
  const [incidentes, setIncidentes] = useState([
    {
      id:1,
      reason:"Bache",
      descripcion:"Hay un bache en la via.",
      lat:4.7463398, 
      lng:-74.0899048,
      img:"https://i.pinimg.com/550x/6d/5e/38/6d5e38d19bf4c0c9554b1e6beab75952.jpg",
      date:"21/03/2024",
      address:"Cra 100 # 148 -57"
    },  
    {
      id:2,
      reason:"Semáforo Averiado",
      descripcion:"Crea trancones por que el semáforo no funciona bien.",
      lat:4.7361224, 
      lng:-74.0999442,
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzSntyiSceSUeHi_6gtIrgHC8ChEVNe-zmVksBmK2mAG3pC0Nt2L3iVVSrZQ8fMWnW_Lo&usqp=CAU",
      date:"14/04/2024",
      address:"Cra 100 # 148 -57"
    },
    {
      id:3,
      reason:"Zona de poca visibilidad",
      descripcion:"Zona oscura y con alto indice de robo.",
      lat:4.7195430, 
      lng:-74.0943718,
      img:"https://png.pngtree.com/png-clipart/20231001/original/pngtree-3d-illustration-avatar-profile-man-png-image_13026634.png",
      date:"05/05/2024",
      address:"Cra 100 # 148 -57"
    },
    {
      id:4,
      reason:"Hueco en la via",
      descripcion:"En ese punto de la via hay un hueco que avarca 2 carriles.",
      lat:4.7469013, 
      lng:-74.0959674,
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0TPcZCGWLUxgjCEnB2QwzftKu4tBupGOLqA&s",
      date:"12/09/2024",
      address:"Cra 100 # 148 -57"
    },
  ]);


  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [viaje, setViaje] = useState(false);

  const [mood, setMood] = useState("New");
  const handleStartTrip = () => {
    setViaje(true);
    setOpenStart(true);
  };

  const [openToast, setOpenToast] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenStart(false);
    setOpenToast(false);
  };



  const [formData, setFormData] = useState({
    reason: '',
    descripcion: '',
    lat:4.7022946,
    lng:-74.1016026
  });

  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.reason || !formData.descripcion || !formData.lat || !formData.lng) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setError('');
    setOpen(false);
    setIncidentes([...incidentes,{"id":incidentes.length + 1, "reason":formData.reason,"descripcion":formData.descripcion,"lat":formData.lat,"lng":formData.lng,"img":"https://png.pngtree.com/background/20230517/original/pngtree-cartoon-of-a-teenager-wearing-glasses-picture-image_2638330.jpg","date":"11/11/2024","address":"Cra 100 # 148 -57"}])
  };
  
  const closeOne = (reason,id) => {
    const desition = confirm(`El incidente ${reason} fue arreglado?`)
    if (desition) {
      const lista_ = incidentes.filter((inc)=> inc.id !== id)
      setIncidentes(lista_)
    }
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Snackbar 
        open={openToast}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={5000}
        onClose={handleClose}
        message="El incidente fue reportado!"
      />
      <Snackbar 
        open={openStart}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Viaje Iniciado!"
      />


      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Reporte de Accidentes
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <MapContainer
          center={[4.7463398, -74.0899048]}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {viaje?<Polyline pathOptions={{color: 'blue'}} positions={polyline} />:null}
          {incidentes.map((inc,idx)=><Resports key={idx} reason={inc.reason} lat={parseFloat(inc.lat)} lng={parseFloat(inc.lng) } descripcion={inc.descripcion} img={inc.img} date={inc.date}/>)}          
        </MapContainer>
        
        
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#1976d2',
            borderRadius: '50%',
            padding: 2,
            boxShadow: 3,
          }}
        >
          <IconButton
            color="inherit"
            onClick={handleStartTrip}
            sx={{ fontSize: 30,zIndex: open ? 0 : 9999 }}
          >
            <AddLocationAlt />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          backgroundColor: '#fff',
          padding: 2,
          borderTop: '1px solid #ccc',
        }}
      >
        <Button
          startIcon={<AnnouncementIcon />}
          variant="outlined"
          onClick={()=>{
            setOpen(true)
            setMood("New")
          }}
        >
          Reportar
        </Button>
        <Button
          startIcon={<FormatListNumberedIcon />}
          variant="outlined"
          onClick={()=>{
            setOpen(true)
            setMood("Report")
          }}
        >
          Verificar
        </Button>
      </Box>

      <Modal
        keepMounted
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
            {
              mood === "New"
              ?
                <Box sx={{ marginTop: 4 }}>
                  <h2>Reporte de Falla Vial</h2>
                  <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="tipo-falla-label">Tipo de Falla</InputLabel>
                      <Select
                        labelId="tipo-falla-label"
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        label="Tipo de Falla"
                      >
                        <MenuItem value="bache">Bache</MenuItem>
                        <MenuItem value="semaforo">Semáforo Averiado</MenuItem>
                        <MenuItem value="zonabaja">Zona de Baja Visibilidad</MenuItem>
                        <MenuItem value="otros">Otros</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="Descripción"
                      variant="outlined"
                      fullWidth
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      margin="normal"
                    />

                    {error && <Box sx={{ color: 'red', marginBottom: 2 }}>{error}</Box>}

                    <Button type="submit" onClick={()=>setOpenToast(true)} variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                      Enviar Reporte
                    </Button>
                  </form>
                </Box>
              :
              <Box sx={{ marginTop: 2 }}>
                  <h2>Historial de fallas Viales</h2>
                  <Grid sx={{gap:2}} display={"flex"} direction={"column"}>
                  {incidentes.map((inc,idx) => <ResportsDetail key={idx} reason={inc.reason} descripcion={inc.descripcion} img={inc.img} date={inc.date} address={inc.address} close={closeOne} id={inc.id}/> )}
                  </Grid>
              </Box>
            }
        </Box>
      </Modal>
    </Box>
  );
}
