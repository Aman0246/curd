import React from 'react'
import Box from '@mui/material/Box';
import UserCard from '../Components/Card';
import CreateIcon from '@mui/icons-material/Create';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <Box>
 <AppBar > <Toolbar position="sticky" sx={{backgroundColor:'white',justifyContent:'space-between'}}><Box><img style={{width:'3.2rem' ,height:'3.2rem'}} src="https://imgs.search.brave.com/cqEvXYBbCTKv1vq8nTriAGwEXmAiMc340gBYII7A0J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE0/MDU1Mzk3MS92ZWN0/b3IvYWJzdHJhY3Qt/YnVzaW5lc3MtYXJy/b3ctdXAtbG9nby1p/Y29uLXZlY3Rvci1k/ZXNpZ24tdGVtcGxh/dGUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU42YkZXYUtm/bUZva0dTZlROSmhF/YllEbkYxUnBsV29t/Y05yT0tJNjVjV1U9"  /></Box> <Link to={'/create'}> <Box title='Create User'><CreateIcon sx={{color:'black',marginLeft:'auto' }}/></Box> </Link> </Toolbar></AppBar>
 <Box sx={{marginTop:10}}>
    <Box sx={{display:'flex',justifyContent:'center',gap:5,flexWrap: 'wrap',}}>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
        
    </Box>
    </Box>
    </Box>
  )
}
