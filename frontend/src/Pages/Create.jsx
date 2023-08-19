import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { storage } from '../Firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from "framer-motion"
const Mainwrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
})

export default function Create() {
    const [imageUpload, setimageUpload] = useState(null)
    const [imageUrl, setimageurl] = useState(null)
    const [inputs, setinputs] = useState({})
    let [loader,setloader]=useState(false)
    const navigate =useNavigate()
    const handleDpchange = (e) => {
        setimageUpload(e.target.files[0])
    }
    const handleInputs = (e) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }
    
    useEffect(() => {
       
        if (imageUpload) {
             setloader(true)
            const imgRef = ref(storage, `DisplayProfile/${imageUpload?.name + new Date()}`)
            uploadBytes(imgRef, imageUpload).then((e) => {
                getDownloadURL(imgRef).then((url) => {
                    setimageurl(url)
                    setloader(false)
                })
            })
            
        }

    }, [imageUpload])
    const handleSubmit = async() => {
        if(inputs.name == undefined || inputs.bio == undefined) return toast.error('Empty Field')
        console.log(inputs.name)
        setloader(true)
        await axios.post('/',{name:inputs.name,bio:inputs.bio,dpUrl:imageUrl}).then((e)=>{
            if(e.data.status == true){
                toast.success('created')
                setloader(false)
                navigate('/')
            }
        })
    }
    return (
        <Mainwrapper>
            
            <motion.div  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} style={{'@media (max-width: 932px)':{width: '100%'}, border: '1px solid #e0e0e0',position:'relative', width:'50%', borderRadius: '10px',padding:"20px" ,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Link to={'/'}>
                <Box sx={{position:'absolute',left:5,top:5}}><ArrowBackIcon/> </Box></Link>
                <Box sx={{ fontSize: '30px',fontWeight:600 }}> Create user</Box>
                <label htmlFor="imgInputLabel" title="profile image">
                    {imageUrl ? <img style={{ width: '15rem', height: '15rem', borderRadius: '50%', cursor: 'pointer' }} src={imageUrl && imageUrl} alt="Loading.." /> : <AccountCircleSharpIcon sx={{'@media (max-width: 932px)':{width: '10rem'} ,width: '15rem', height: '15rem', borderRadius: '50%', cursor: 'pointer' }} />}
                </label>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField id="standard-basic" onChange={handleInputs} label="Name" name='name' variant="standard" />
                    <input onChange={handleDpchange} id="imgInputLabel" style={{ display: 'none' }} type='file'></input>
                    <TextField
                        onChange={handleInputs}
                        name='bio'
                        id="standard-textarea"
                        label="Bio"
                        placeholder="Write about YourSelf"
                        multiline
                        variant="standard"
                    />
                    <LoadingButton loading={loader} sx={{ marginTop: '20px',position:'relative' }} onClick={handleSubmit} variant="contained">Submit
                    </LoadingButton>
                </Box>
            </motion.div>
        </Mainwrapper>
    )
}

