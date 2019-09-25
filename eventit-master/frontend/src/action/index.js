export const UserDetails = (acceptParams) => {
    return async (dispatch) => {

        console.log(acceptParams);

        let obj = {
            id : acceptParams
        }

        dispatch({ type: "AUTHENTICATING_USER", payload: obj });

    }
}