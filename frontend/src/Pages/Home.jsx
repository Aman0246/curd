import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import UserCard from '../Components/Card';
import CreateIcon from '@mui/icons-material/Create';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CircularColor from '../Loading/loader';
import gif from './riLo6kpeT.gif'
import { motion } from "framer-motion"
export default function Home() {
  let [data, setdata] = useState(null)
  let [loader, setloader] = useState(false)

  useEffect(() => {
    setloader(true)
    const fetchdata = async () => {
      await axios.get('/allusers').then((e) => {
        console.log(e.data.data.length)
        setloader(false)
        setdata(e)
      })
    }
    fetchdata()
  }, [])
  return (

    <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }}>
      <AppBar > <Toolbar position="sticky" sx={{ backgroundColor: 'white', justifyContent: 'space-between' }}><Box><img style={{ width: '3.2rem', height: '3.2rem' }} src="https://imgs.search.brave.com/cqEvXYBbCTKv1vq8nTriAGwEXmAiMc340gBYII7A0J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE0/MDU1Mzk3MS92ZWN0/b3IvYWJzdHJhY3Qt/YnVzaW5lc3MtYXJy/b3ctdXAtbG9nby1p/Y29uLXZlY3Rvci1k/ZXNpZ24tdGVtcGxh/dGUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU42YkZXYUtm/bUZva0dTZlROSmhF/YllEbkYxUnBsV29t/Y05yT0tJNjVjV1U9" /></Box> <Link to={'/create'}> <Box title='Create User'><CreateIcon sx={{ color: 'black', marginLeft: 'auto' }} /></Box> </Link> </Toolbar></AppBar>
      <Box sx={{ marginTop: 10 }}>


        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap', }}>
          {data && data.data.data.length == 0 ? <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontSize:'30px'}}><Box><img src={gif} style={{width:'100%',height:'50vh'}} /></Box><Box>Empty</Box> <Link to={'/create'}><Button sx={{marginTop:'10px'}} variant='contained'>Create</Button></Link> </Box> : data && data.data.data.map((e) => (<UserCard e={e} />))}
         

          {loader && <Box sx={{ position: 'absolute', background: 'rgb(245 245 245 / 50%)', width: '100%', height: '100vh', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <CircularColor></CircularColor>
          </Box>}
        </Box>
      </Box>
    </motion.div>
  )
}
