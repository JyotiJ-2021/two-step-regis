import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import { useFormik } from "formik"
import * as yup from "yup"
import AddressDetails from './AddressDetails';
import { useDispatch } from "react-redux"
import { setDetailList } from "../redux/regSlice";
import { useAppSelector } from "../redux/hooks";
import DataTable from 'datatables.net-dt';


interface FormValues {
  name: string | '';
  age: number;
  sex: string | '';
  mobile: string | '';
  idType: string | '';
  govtId: string | '';
}

const ValidationSchema: yup.Schema<FormValues> = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  age: yup.number().required('Age is required').positive('Age must be a positive integer'),
  sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: yup.string().matches(/^[6-9]\d{9}$/, "Invalid Indian Mobile Number"),
  idType: yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
  govtId: yup.lazy((value) => {
    if (value && value.idType === 'Aadhar') {
      return yup.string().matches(/^[2-9]\d{11}$/, 'Invalid Aadhar ID');
    } else if (value && value.idType === 'PAN') {
      return yup.string().length(10, 'PAN must be a ten-character long alpha-numeric string');
    }
    return yup.string(); // Return a default schema if idType is not Aadhar or PAN
  })
});

export default function PersonalDetails() {
  const [isDetailFilled, setIsDetailFilled] = React.useState(false)
  const dispatch = useDispatch()
  const { DetailList } = useAppSelector((state) => state.detail);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      age: 18,
      sex: '',
      mobile: '',
      idType: '',
      govtId: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {

      setIsDetailFilled(true)


      dispatch(setDetailList(values))
    }
  })

  // let table = new DataTable('#myTable');
console.log(DetailList)
  return (
    <>
      {!isDetailFilled ?
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: "column", fontSize: "12px" }}>
          <Typography sx={{ marginBottom: "20px" }}>Personal Details</Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>



            <FormControl sx={{ m: 1, width: '100%', display: "flex", gap: "20px" }} variant="outlined">
              <FormHelperText id="outlined-adornment-name">Name<span style={{ color: "red" }}>*</span></FormHelperText>
              <OutlinedInput
                id="outlined-adornment-name"

                placeholder='Enter Name'
                name='name' type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
              //  helperText={formik.touched.name && formik.errors.name}
              />

            </FormControl>


            <FormControl sx={{ m: 1, width: '100%', display: "flex", gap: "20px" }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">Enter Date of Birth or Age<span style={{ color: "red" }}>*</span></FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                placeholder='DD/MM/YYYY or Age in Years'
                inputProps={{
                  'aria-label': 'weight',
                }}
                name='age' type="text"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: "50%", display: "flex", gap: "20px" }}>
              <FormHelperText>Sex<span style={{ color: "red" }}>*</span></FormHelperText>
              <Select
                name='sex'
                value={formik.values.sex}
                onChange={formik.handleChange}
                error={formik.touched.sex && Boolean(formik.errors.sex)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" sx={{ fontSize: "12px" }}>
                  Enter Sex
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>

            </FormControl>

          </Box>

          <Box sx={{ display: 'flex', gap: '20px' }}>



            <FormControl sx={{ m: 1, width: '100%', display: "flex", gap: "20px" }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">Mobile</FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }} type="text"
                placeholder='Enter Mobile'
                name='mobile'
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: "100%", display: "flex", gap: "20px" }}>
              <FormHelperText>Govt Issued ID</FormHelperText>
              <Box sx={{ width: "100%", display: "flex", gap: "20px" }}>
                <Select
                  name='idType'
                  value={formik.values.idType}
                  onChange={formik.handleChange}
                  error={formik.touched.idType && Boolean(formik.errors.idType)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    ID Type
                  </MenuItem>
                  <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
                  <MenuItem value={"PAN"}>PAN</MenuItem>
                </Select>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  type="text"
                  placeholder='Enter Govt ID'
                  name='govtId'
                  value={formik.values.govtId}
                  onChange={formik.handleChange}
                  error={formik.touched.govtId && Boolean(formik.errors.govtId)}
                />
              </Box>
            </FormControl>




          </Box>

          <Button variant="contained" onClick={formik.handleSubmit} sx={{ width: "100px", m: 1, marginTop: "20px" }}>Continue</Button>


        </Box> :
        <AddressDetails />
      }


     
      {DetailList && DetailList.length > 0 &&
        <table id="myTable" className="display">
          <thead>
            <tr>
              <th> Name </th>
              <th>Sex</th>
              <th>Mobile</th>
              <th>Government ID</th>

              <th>age</th>
              <th> Address </th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>Pincode</th>

              <th>age</th>
            </tr>
          </thead>
          <tbody>
         { DetailList.map((item:any,i:any)=>{
         
           <tr key={i}>
              <td>{item.name}</td>
              <td>{item.sex}</td>
              <td>{item.mobile}</td>
              <td>Government ID</td>
              <td>{item.age}</td>
              <td>Address</td>
              <td>State</td>
              <td>City</td>
              <td>Country</td>
              <td>Pincode</td>
              <td>Age</td>
            </tr>
         }) 
}
          </tbody>
        </table>
      }
    </>
  );
}

