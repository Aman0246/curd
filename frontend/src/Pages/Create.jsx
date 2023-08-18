import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { storage } from '../Firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Mainwrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
})

export default function Create() {
    const [imageUpload, setimageUpload] = useState(null)
    const [imageUrl, setimageurl] = useState(null)
    const [inputs, setinputs] = useState({})
    const handleDpchange = (e) => {
        setimageUpload(e.target.files[0])
    }
    const handleInputs = (e) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }
    console.log(inputs)
    useEffect(() => {
        if (imageUpload) {
            const imgRef = ref(storage, `DisplayProfile/${imageUpload?.name + new Date()}`)
            uploadBytes(imgRef, imageUpload).then((e) => {
                getDownloadURL(imgRef).then((url) => {
                    setimageurl(url)
                })
            })
        }

    }, [imageUpload])

    // let formData = new FormData()
    // formData.append('dpUrl', imageUrl)
    // formData.append('name', inputs.name)
    // formData.append('bio', inputs.bio)

    const handleSubmit = async() => {
        await axios.post('/',{name:inputs.name,bio:inputs.bio,dpUrl:imageUrl})
    }
    return (
        <Mainwrapper>
            <Box sx={{ border: '1px solid #e0e0e0',position:'relative', width: '25%', borderRadius: '10px',padding:"20px" ,display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px' }}>
                <Link to={'/'}>
                <Box sx={{position:'absolute',left:5,top:5}}><ArrowBackIcon/> </Box></Link>
                <Box sx={{ fontSize: '30px',fontWeight:600 }}> Create user</Box>
                <label htmlFor="imgInputLabel" title="profile image">
                    {imageUrl ? <img style={{ width: '15rem', height: '15rem', borderRadius: '50%', cursor: 'pointer' }} src={imageUrl && imageUrl} alt="Loading.." /> : <AccountCircleSharpIcon sx={{ width: '15rem', height: '15rem', borderRadius: '50%', cursor: 'pointer' }} />}
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
                    <Button sx={{ marginTop: '20px' }} onClick={handleSubmit} variant="contained">Submit</Button>
                </Box>
            </Box>
        </Mainwrapper>
    )
}
