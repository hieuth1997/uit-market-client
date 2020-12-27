import * as types from "./constants";

const initialState = {
  category: [],
  categoryId: '',
  isLoading: false,

  listAsks: [],
  errors: [],
  sectionNews: [],
  sectionVideos: [],
  sectionConnections: [],
  askComment: [],
  userProfile: [],
  open: false,
  openVideo: false,
  linkVideo: "",
  openModalDelete: false,
  idAskDelete: "",
  isLoadPostAsk: false,
  isLoadsectionVideos: false,
  isLoadsectionConnections: false,
  lazyLoading: {
    offset: 0,
    limit: 3,
    sort: 'desc',
    limitPage: 3,
    isFetching: false,
    isFetched: false,
  },
  openModalImage: false,
  linkImage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PUT_CATEGORY: {
      const { value } = action.payload;
      return {
        ...state,
        categoryId: value
      };
    }
    //get ask
    case types.GET_NEW_FEED: {
      return {
        ...state,
      };
    }
    case types.GET_NEW_FEED_SUCCESS: {
      const { data } = action.payload;
      if (data.length === state.lazyLoading.limit) {
        return {
          ...state,
          listAsks: data,
          lazyLoading: {
            ...state.lazyLoading,
            limit: state.lazyLoading.limit + state.lazyLoading.limitPage,
            isFetching: false,
          }
        };
      }
      else {
        return {
          ...state,
          listAsks: data,
          lazyLoading: {
            ...state.lazyLoading,
            isFetched: true,
          }
        };
      }
    }

    case types.GET_NEW_FEED_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true
      };
    }
    //get news
    case types.GET_CATEGORY: {
      return {
        ...state,
      };
    }
    case types.GET_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        category: data
      };
    }
    case types.GET_CATEGORY_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true
      };
    }
  
    //user post ask
    case types.POST_STATUS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.POST_STATUS_SUCCESS: {
      const newPost = action.payload.data.data;
      let dataNewPost = [newPost].concat(state.listAsks);
      return {
        ...state,
        isLoading: false,
        listAsks: dataNewPost,
      };
    }
    case types.POST_STATUS_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        errors: error,
        open: true,
      };
    }

    //get profile
    case types.GET_PROFILE: {
      return {
        ...state,
      };
    }
    case types.GET_PROFILE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        userProfile: data,
      };
    }
    case types.GET_PROFILE_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true
      };
    }
    //modal error
    case types.CLOSE_GET_NEW_FEED_ERROR_MODAL: {
      return {
        ...state,
        isLoadPostAsk: false,
        open: false,
      };
    }
   
    //modal delete
    case types.OPEN_MODAL_DELETE: {
      let { data } = action.payload;
      return {
        ...state,
        openModalDelete: true,
        idAskDelete: data
      };
    }
    case types.CLOSE_MODAL_DELETE: {
      return {
        ...state,
        openModalDelete: false,
        idAskDelete: ""
      };
    }
    case types.ARGEE_DELETE: {
      return {
        ...state
      };
    }
    case types.ARGEE_DELETE_SUCCESS: {
      let { data } = action.payload;
      return {
        ...state,
        listAsks: state.listAsks.filter(item => item.id !== data)
      };
    }
    default:
      return state;
  }
};

export default reducer;
