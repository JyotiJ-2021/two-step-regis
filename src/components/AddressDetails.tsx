import * as React from 'react';
import Box from '@mui/material/Box'; 
import OutlinedInput from '@mui/material/OutlinedInput';  
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import {useFormik} from "formik"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import {setDetailList } from "../redux/regSlice";
import { useAppSelector } from "../redux/hooks";


interface FormValues{
  address:string|'';
  state:string;
  city:string|'';
   country:string|'';
  pincode:string|'';
}

const ValidationSchema: yup.Schema<FormValues> = yup.object({
  address: yup.string() ,
  state: yup.string() ,
  city: yup.string() ,
  country: yup.string() ,
  pincode:yup.string().matches(/^\d+$/,'Pincode must be numeric')
});

export default function AddressDetails() { 
  const [isDetailFilled, setIsDetailFilled] = React.useState(false) 
  const [states, setStates] = React.useState<string[]>([]);
  const [cities, setCities] = React.useState<string[]>([]);
  const [countries, setCountries] = React.useState<string[]>([]);
  const dispatch = useDispatch()
  const { DetailList } = useAppSelector((state) => state.detail);

  const formik  = useFormik<FormValues>({
    initialValues:{
      address:'',
      state:'',
      city:'',
      country:'',
      pincode:''
    },
    validationSchema: ValidationSchema,
    onSubmit:(values)=>{
      console.log(values)
      setIsDetailFilled(true)
      dispatch( setDetailList((prevDetailList) => [...prevDetailList, values]))
    }
  })
 
 
 

  const getCountry = async(value:string)=>{
    try {
        const response = await fetch(`https://restcountries.com/v2/name/${value}`);
        const data = await response.json();
        setCountries(data.geonames  )
        
    } catch (error) {
        console.error("Errro fetching countries",error)
        
    }
  }
  

  const handleCountryChange = async(e:any)=>{
    const country =  e.target.value as string;
    formik.setFieldValue('country', country)
  }

  const handleStateChange = async(e:any)=>{
    const state =  e.target.value as string;
    formik.setFieldValue('state', state)
   
  }

  const handleCitiesChange = async(e:any)=>{
    const city =  e.target.value as string;
    formik.setFieldValue('city', city)
    
  }

 

  return (
    <>
   
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection:"column",fontSize:"12px" }}>
     <Typography sx={{marginBottom:"20px"}}>Address Details</Typography>
      <Box sx={{display:'flex', gap:'20px'}}>
     

     
      <FormControl sx={{ m: 1, width: '100%',display:"flex", gap:"20px" }} variant="outlined">
         <FormHelperText   id="outlined-adornment-name">Address<span style={{color:"red"}}>*</span></FormHelperText>
          <OutlinedInput
            id="outlined-adornment-name"
           
            placeholder='Enter Address'
            name='name' type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
         
          />
         
        </FormControl>
         
     
        <FormControl sx={{ m: 1, width: '100%',display:"flex", gap:"20px" }} variant="outlined">
         <FormHelperText   id="outlined-adornment-name">State<span style={{color:"red"}}>*</span></FormHelperText>
          <OutlinedInput
            id="outlined-adornment-name"
           
            placeholder='Enter State'
            name='state' type="text"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
         
          />
         
        </FormControl>
      
        <FormControl sx={{ m: 1, width: '100%',display:"flex", gap:"20px" }} variant="outlined">
         <FormHelperText   id="outlined-adornment-name">City<span style={{color:"red"}}>*</span></FormHelperText>
          <OutlinedInput
            id="outlined-adornment-name"
           
            placeholder='Enter City'
            name='city' type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
         
          />
         
        </FormControl>
      
      </Box>
    
      <Box sx={{display:'flex', gap:'20px'}}>
     
 
     
        <FormControl sx={{ m: 1, width:"100%",  display:"flex", gap:"20px" }}>
        <FormHelperText>Country</FormHelperText>
        <Box  sx={{   width:"100%",  display:"flex", gap:"20px" }}>
        <Select 
           name='country'
           value={formik.values.country}
           onChange={handleCountryChange}
           error={formik.touched.country && Boolean(formik.errors.country)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        
        >
          <MenuItem value="">
           Select Country
          </MenuItem> 
          <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
          <MenuItem value={"PAN"}>PAN</MenuItem>
        </Select>
        {formik.touched.country && formik.errors.country && (
          <FormHelperText error>{formik.errors.country}</FormHelperText>
        )}
        
        </Box>
      </FormControl>

      <FormControl sx={{ m: 1, width: '100%',display:"flex", gap:"20px" }} variant="outlined">
         <FormHelperText id="outlined-weight-helper-text">Pincode</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            placeholder='Enter Pincode'
           
            name='pincode' type="text"
            value={formik.values.pincode}
            onChange={formik.handleChange}
            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          />
         
        </FormControl>

      
         
      
      </Box>

      <Button variant="contained" onClick={formik.handleSubmit} sx={{width:"100px", m:1, marginTop:"20px"}}>Submit</Button>
    
    
    </Box>
    

    </>
  );
}

 