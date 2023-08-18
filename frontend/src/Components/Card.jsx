import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserCard({e}) {
  let [reload,setreload] = React.useState(true)
  const handleDelete = async(e) =>{
  await axios.delete(`/${e}`).then((e)=>{
    toast.success('deleted')
  setreload(!reload);
  window.location.reload();
})
  }

  return (
    <Card sx={{ maxWidth: 345,minWidth:345 ,minHeight: 300, background: '#fafafa00', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
      <CardMedia
         sx={{
          height: 250, 
          margin: '10px', // Add margin around the CardMedia
          objectFit:'', // Add this to ensure the image fits within the container
        }}
        
        image={e.dpUrl ? e.dpUrl: "https://imgs.search.brave.com/wn9jI_HLJGgc5bJ-UXDZ2ZEooBa0wzyVMvXNP_ADSVU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvZ29rdS1waWN0/dXJlcy00ZXNnZG16/cnZ6OHZlNGhxLmpw/Zw" }
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {e.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {e.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/edit/${e._id}`}>
          <Button size="small">Edit</Button>
        </Link>
        <Button onClick={()=>handleDelete(e._id)} sx={{color:'red'}} size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}