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
import { useNavigate } from 'react-router-dom'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ErrorSharp } from '@mui/icons-material'


const Create = () => {

  const hardcoded_options = [
    {id:'', name:'None'}, 
    {id:'Open', name:'Open'}, 
    {id:'In progress', name:'In progress'}, 
    {id:'Completed', name:'Completed'}, 
  ]

  const [projectManager, setProjectManager] = useState();
  const [pm_loading, pm_setLoading] = useState(true);

  const GetData = (data) => {
    AxiosInstance.get('projectmanager/')
    .then((res) => {
      console.log(res.data)
      setProjectManager(res.data);
      pm_setLoading(false)
    })
  }

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const defaultValues = {
    name : '',
    comments : '',
    status : '',
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is a required field.'),
    projectmanager: yup.string().required('Project Manager is a required field'),
    status: yup.string().required('Status is a required field.'),
    comments: yup.string(),
    start_date: yup.date().required('Start Date is a required field.'),
    end_date: yup.date().required('End Date is a required field.').min(yup.ref('start_date'), 'End Date has to be after Start Date.'),
  })
  .required()

  const { handleSubmit, control } = useForm({defaultValues:defaultValues, resolver: yupResolver(schema)});

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")

    AxiosInstance.post( `project/`, {
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
      { pm_loading ? <p>Loading data...</p> :
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
          <Box sx={{display: 'flex', justifyContent:'space-around', marginTop:'50px'}}> 
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

export default Create;
