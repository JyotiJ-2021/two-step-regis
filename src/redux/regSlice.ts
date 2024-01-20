import { createSlice, current } from "@reduxjs/toolkit"
 
 

export interface CounterState {
  
  DetailList:any
  
}
 

const initialState: CounterState = {
 
  DetailList:""
}
 

export const counterSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
      setDetailList: (state, action) => {
      state.DetailList =[...state.DetailList, action.payload]
    },
     
    
  }
})

export const { 
  setDetailList 
} = counterSlice.actions

export default counterSlice.reducer