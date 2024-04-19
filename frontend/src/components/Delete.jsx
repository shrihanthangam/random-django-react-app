import { React, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Button } from '@mui/material'
import AxiosInstance from './Axios'
import { useNavigate, useParams } from 'react-router-dom'

const Delete = () => {
  const MyParam = useParams()
  const MyId = MyParam.id
  const navigate = useNavigate();

  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);

  const GetData = (data) => {
    AxiosInstance.get(`project/${MyId}/`)
    .then((res) => {
      console.log(res.data)
      setMyData(res.data);
      setLoading(false)
    })
  }


  useEffect(() => {
    console.log(MyId);
    GetData();
  }, []);


  const submission = (data) => {
    AxiosInstance.delete( `project/${MyId}/`, {
      
    })

    .then((res) => {
      navigate('/')
    })
  };

  return (
    <>
      { loading ? <p>Loading data...</p> :
      <>
        <Box sx={{display: 'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'30px'}}>
          <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Delete Project: {myData.name}
          </Typography>
        </Box>

        <Box sx={{display: 'flex', width:'100%', boxShadow:3, padding:'15px', flexDirection:'column'}}>
          <Box sx={{display: 'flex', justifyContent:'start', marginBottom:'30px'}}>
            Are you sure you want to delete project: {myData.name}
          </Box>
          <Box sx={{width: '30%'}}>
            <Button variant='contained' onClick={submission} sx={{width:'100%'}}>
              Delete the project.
            </Button>
          </Box>
        </Box>
          
      </>
      }
    </>
  )
}

export default Delete;
