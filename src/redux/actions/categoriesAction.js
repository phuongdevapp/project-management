

export const loadDataHandle = access_token => async (dispatch) => {
  dispatch({ type: PROJECTS_CATEGORIES_GETLIST_REQUEST })
  try {
    let response = await axios.get(`${ROOT_URL}/api/Project/GetCategories`, {
      headers: {
        'Authorization': `bearer ${access_token}`
      }
    }
    )
    if (response) {
      if (response.status === 200) {
        console.log(response.data)
        dispatch({ type: PROJECTS_CATEGORIES_GETLIST_SUCCESS, payload: response.data })
      }
    }

  } catch (error) {
    console.log(error);
  }
}