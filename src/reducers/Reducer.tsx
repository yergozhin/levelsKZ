import React from 'react'

import { ADD_PAGE, DELETE_PAGE } from "../actions/Action.tsx";

const initialState = {
    pages: [],
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PAGE:
            return {
                pages: [
                    ...state.pages,
                    {
                        company: action.payload.company,
                        experience: action.payload.experience,
                        location: action.payload.location,
                        annualSalary: action.payload.annualSalary,
                        date: action.payload.date,
                        specialization: action.payload.specialization
                    }
                ]
            }
        case DELETE_PAGE:
            return{
                pages: [...state.pages.filter(page => page.company !== action.payload)]
            }
        default:
            return state;
    }
}
export default reducer;