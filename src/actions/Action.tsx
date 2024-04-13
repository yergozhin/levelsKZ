export const ADD_PAGE = "ADD_PAGE";
export const DELETE_PAGE = "DELETE_PAGE";

export const addPage = (company, experience, location,annualSalary,date,specialization) => {
    let task = {
        company: company,
        experience: experience,
        location: location,
        annualSalary: annualSalary,
        date: date,
        specialization: specialization
    }

    return{
        type: ADD_PAGE,
        payload: task
    };
};
export const deletePage = (company) => {
    return{
        type: DELETE_PAGE,
        payload: company
    };
};