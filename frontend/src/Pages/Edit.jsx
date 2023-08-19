import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { storage } from '../Firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import { motion } from "framer-motion";
import './a.css';
const Mainwrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
})

export default function Edit() {
    const [imageUpload, setimageUpload] = useState(null)
    const [extractdata, setextractdata] = useState(null)
    const [extractname, setextractname] = useState(null)
    const [extractbio, setextractbio] = useState(null)
    const [extracturl, setextracturl] = useState(null)
    const [loader,setloader]=useState(false)
    const navigate=useNavigate()
    useEffect(() => {
        const extractData = async () => {
            await axios.post(`/oneusers/${params.id}`).then((e) => {
                setextractdata({ ...e.data.data })
                setextractname(e.data.data.name)
                setextractbio(e.data.data.bio)
                setextracturl(e.data.data.dpUrl)
            })
        }
        extractData()
    }, [])
    const handleDpchange = (e) => {
        setimageUpload(e.target.files[0])
    }
    useEffect(() => {
        if (imageUpload) {
            setloader(true)
            const imgRef = ref(storage, `DisplayProfile/${imageUpload?.name + new Date()}`)
            uploadBytes(imgRef, imageUpload).then((e) => {
                getDownloadURL(imgRef).then((url) => {
                    setextracturl(url)
                    setloader(false)
                })
            })
        }
    }, [imageUpload])
    const params = useParams()
    const handleSubmit = async () => {
        setloader(true)
         await axios.put(`/${params.id}`, { ...extractdata,name:extractname,bio:extractbio,dpUrl:extracturl }).then((e)=>{
            if(e.status == 200){
                toast.success('User Changed')
                setloader(false)
                navigate('/')
            }
         })
    }
    const divStyles = {
        border: '1px solid #e0e0e0',
        position: 'relative',
        width: '25%', // Default width
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px',
    
        '@media (max-width: 932px)': {
            width: '100%',
          background:'red' // Adjust width for screens up to 932px wide,
          
        },
      };
    return (

        extractdata ? 
        <Mainwrapper>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className='divStyles' >
                <Box sx={{ fontSize: '30px', fontWeight: 600 }}>Edit user</Box>
                <Link to={'/'}>
                    <Box sx={{ position: 'absolute', left: 5, top: 5 }}><ArrowBackIcon /> </Box></Link>
                <label htmlFor="imgInputLabel" title="profile image">
                    {extracturl ? <img  className="imageE" src={extracturl && extracturl} alt="Loading.." /> : <AccountCircleSharpIcon sx={{'@media (max-width: 932px)':{width: '10rem'} ,width: '15rem', height: '15rem', borderRadius: '50%', cursor: 'pointer' }} />}
                </label>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField id="standard-basic" value={extractname} onChange={(e)=>setextractname(e.target.value)} label="Name" name='name' variant="standard" />
                    <input onChange={handleDpchange} id="imgInputLabel" style={{ display: 'none' }} type='file'></input>
                    <TextField
                        value={extractbio}
                        onChange={(e)=>setextractbio(e.target.value)}
                        name='bio'
                        id="standard-textarea"
                        label="Bio"
                        placeholder="Write about YourSelf"
                        multiline
                        variant="standard"
                    />
                    <LoadingButton loading={loader} sx={{ marginTop: '20px' }} onClick={handleSubmit} variant="contained">Submit</LoadingButton>
                </Box>
            </motion.div>
        </Mainwrapper>:<Box>a</Box>

        

    )
}
