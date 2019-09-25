

export default (state = {}, action) => {


    switch (action.type) {

        case "AUTHENTICATING_USER":
        console.log("reducer");
            var obj = action.payload;
            return { ...obj };
        default:
            return state;

    }



}