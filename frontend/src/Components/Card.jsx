import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


export default function UserCard() {
  return (
    <Card sx={{ maxWidth: 345, minHeight: 300, background: '#fafafa00', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
      <CardMedia
        sx={{ height: 140, margin: '10px' }}
        image="https://imgs.search.brave.com/wn9jI_HLJGgc5bJ-UXDZ2ZEooBa0wzyVMvXNP_ADSVU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvZ29rdS1waWN0/dXJlcy00ZXNnZG16/cnZ6OHZlNGhxLmpw/Zw"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"/edit"}>
          <Button size="small">Edit</Button>
        </Link>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}