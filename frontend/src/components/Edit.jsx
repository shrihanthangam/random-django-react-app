import { React, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Button } from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyTextField from './forms/MyTextFields'
import MySelectField from './forms/MySelectField'
import MyMultiLineField from './forms/MyMultiLineField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
  const hardcoded_options = [
    {id:'', name:'None'}, 
    {id:'Open', name:'Open'}, 
    {id:'In progress', name:'In progress'}, 
    {id:'Completed', name:'Completed'}, 
  ]


  const MyParam = useParams()
  const MyId = MyParam.id

  const [projectManager, setProjectManager] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [myData, setMyData] = useState();
  const GetData = (data) => {
    let pm;
    AxiosInstance.get(`projectmanager/`).then((res) =>{
      setProjectManager(res.data)
      console.log(res.data)
    })


    AxiosInstance.get(`project/${MyId}/`)
    .then((res) => {
      console.log(res.data)
      setValue("name", res.data.name)
      setValue("projectmanager", res.data.projectmanager)
      setValue("status", res.data.status ? res.data.status : "")
      setValue("comments", res.data.comments)
      setValue("start_date", Dayjs(res.data.start_date))
      setValue("end_date", Dayjs(res.data.end_date))
      setLoading(false)
    })

  }

  useEffect(() => {
    console.log(MyId);
    GetData();
  }, []);

  const defaultValues = {
    name : '',
    comments : '',
    status : '',
  }

  const { handleSubmit, setValue, control } = useForm({defaultValues:defaultValues});

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")

    AxiosInstance.put( `project/${MyId}/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      status:  data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    })

    .then((res) => {
      navigate('/')
    })
  };

  return (
    <>
    { loading ? <p>Loading data...</p> :
    <form onSubmit={handleSubmit(submission)}>
      <Box sx={{display: 'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'30px'}}>
        <Typography sx={{marginLeft:'20px', color:'#fff'}}>
          Create Records
        </Typography>
      </Box>

      <Box sx={{display: 'flex', width:'100%', boxShadow:3, padding:'15px', flexDirection:'column'}}>
        <Box sx={{display: 'flex', justifyContent:'space-around', marginBottom:'30px'}}> 
          <MyTextField
            label="Name"
            name="name"
            control={control}
            placeholder="Provide a project name"
            width={'30%'}
          />

          <MyDatePickerField
            label="Start Date"
            name="start_date"
            control={control}
            width={'30%'}
          />

          <MyDatePickerField
            label="End Date"
            name="end_date"
            control={control}
            width={'30%'}
          />
        </Box>
        
        <Box sx={{display: 'flex', justifyContent:'space-around'}}> 
          <MyMultiLineField
            label="Comments"
            name="comments"
            control={control}
            placeholder="Provide project comments"
            width={'30%'}
          />

          <MySelectField
            label="Status"
            name="status"
            control={control}
            width={'30%'}
            options={hardcoded_options}
          />

          <MySelectField
            label="Project Manager"
            name="projectmanager"
            control={control}
            width={'30%'}
            options={projectManager}
          />

          </Box>
          <Box sx={{display: 'flex', justifyContent:'space-around', marginTop: '50px'}}> 
            <Button variant='contained' type='submit' sx={{width:'30%'}}>
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      }
    </>
  )
}

export default Edit;
