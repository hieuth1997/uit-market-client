import * as types from "./constants";

const initialState = {
  listAsks: [],
  errors: [],
  listSchool: [],
  category: [],
  sectionNews: [
    {
      image: './../assets/images/do-an-vat.jpg',
      title: 'Đồ ăn vặt',
      content: 'Student Market nơi trao đổi buôn bán những món ăn độc đáo, thiết thực phục vụ nhu cầu ăn uống của sinh viên.',
    },
    {
      image: './../assets/images/do-cong-nghe.jpg',
      title: 'Đồ Công Nghệ',
      content: 'Student Market nơi thỏa thích mua sắm trao đổi các mặt hàng công nghệ, đồ phụ kiện. Còn chờ gì nữa mà không tìm kiếm ngay cho mình món đồ ưng ý nào các bạn sinh viên ơi.',
    },
    {
      image: './../assets/images/fashion.jpg',
      title: 'Đồ thời trang',
      content: 'Student Market mang cả thế giới thời trang về cho bạn tự do mua sắm và chọn những món đồ ưng ý nhất.',
    }
  ],
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
    sortDate: 'desc',
    sortPrice: 'desc',
    limitPage: 1,
    schoolId: 0,
    categoryId: 0,
    keyword: '',
    isFetching: false,
    isFetched: false,
  },
  openModalImage: false,
  linkImage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //get ask
    case types.SET_FETCHING_DATA: {
      return {
        ...state,
        listAsks: [],
        lazyLoading: {
          offset: 0,
          limit: 3,
          sortDate: 'desc',
          sortPrice: 'desc',
          limitPage: 1,
          schoolId: 0,
          categoryId: 0,
          keyword: '',
          isFetching: false,
          isFetched: false,
        },
      };
    }
    case types.GET_NEW_FEED: {
      return {
        ...state,
        lazyLoading: {
          ...state.lazyLoading,
          isFetching: true,
        }
      };
    }
    case types.GET_NEW_FEED_SUCCESS: {
      const { data } = action.payload;
      if (data.length > 0 && data.length <= state.lazyLoading.limit) {
        let oldList = state.listAsks;
        let listProduct = oldList.concat(data);
        return {
          ...state,
          listAsks: listProduct,
          lazyLoading: {
            ...state.lazyLoading,
            offset: state.lazyLoading.offset + state.lazyLoading.limitPage,
            isFetching: false,
          }
        };
      } else {
        return {
          ...state,
          // listAsks: listProduct,
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

    //get video
    case types.GET_VIDEO: {
      return {
        ...state,
        sectionVideos: [],
        isLoadsectionVideos: true,
      };
    }
    case types.GET_VIDEO_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        sectionVideos: data,
        isLoadsectionVideos: false,
      };
    }
    case types.GET_VIDEO_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true,
        isLoadsectionVideos: false,
      };
    }
    //get connection
    case types.GET_CONNECTION: {
      return {
        ...state,
        sectionConnections: [],
        isLoadsectionConnections: true,
      };
    }
    case types.GET_CONNECTION_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        sectionConnections: data,
        isLoadsectionConnections: false,
      };
    }
    case types.GET_CONNECTION_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true,
        isLoadsectionConnections: false,
      };
    }
    //like ask
    case types.LIKE_ASK: {
      return {
        ...state,
      };
    }
    case types.LIKE_ASK_SUCCESS: {
      return {
        ...state,
      };
    }
    case types.LIKE_ASK_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        open: true,
        errors: error,
      };
    }
    //user comment ask
    case types.ADD_COMMENT: {
      return {
        ...state,
      };
    }
    case types.ADD_COMMENT_SUCCESS: {
      console.log();
      
      const newComment = action.payload.data;
      let listComment = [newComment].concat(state.askComment);
      const idAsk = action.payload.data.productId;
      // const numberOfComments = action.payload.data.numberOfComments;
      // for (var i in state.listAsks) {
      //   if (state.listAsks[i].id === idAsk) {
      //     state.listAsks[i].countComments = numberOfComments;
      //     break;
      //   }
      // }
      return {
        ...state,
        askComment: listComment,
      };
    }
    case types.ADD_COMMENT_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true,
      };
    }
    //get comment
    case types.GET_COMMENT: {
      return {
        ...state,
      };
    }
    case types.GET_COMMENT_SUCCESS: {
      const { data } = action.payload;
      let mergeArray = (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, []);
      let listComment = mergeArray('id', state.askComment, data);
      return {
        ...state,
        askComment: listComment,
      };
    }
    case types.GET_COMMENT_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true
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
        // open: true
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
    //modal video
    case types.OPEN_MODAL_VIDEO: {
      let { data } = action.payload;
      return {
        ...state,
        openVideo: true,
        linkVideo: data,
      };
    }
    case types.CLOSE_MODAL_VIDEO: {
      return {
        ...state,
        openVideo: false,
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
    //modal image
    case types.CLOSE_MODAL_IMAGE:
      return {
        ...state,
        openModalImage: false,
      };
    case types.OPEN_MODAL_IMAGE:
      return {
        ...state,
        openModalImage: true,
      };
    case types.SET_LINK_IMAGE:
      return {
        ...state,
        linkImage: action.link,
      };
    // get category
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

    //get list school
    case types.GET_SECTION_NEWS: {
      return {
        ...state,
        listSchool: [],
      };
    }
    case types.GET_SECTION_NEWS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listSchool: data
      };
    }
    case types.GET_SECTION_NEWS_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true
      };
    }
    // filter
    case types.FILTER_BY_SCHOOL: {
      return {
        ...state,
        listAsks: [],
        lazyLoading: {
          ...state.lazyLoading,
          offset: 0,
          schoolId: action.payload.data
        },
      };
    }

    case types.FILTER_BY_CATEGORY: {
      return {
        ...state,
        listAsks: [],
        lazyLoading: {
          ...state.lazyLoading,
          offset: 0,
          categoryId: action.payload.data
        },
      };
    }

    case types.FILTER_BY_VALUE: {
      switch (action.payload.data) {
        case '0': {
          return {
            ...state,
            listAsks: [],
            lazyLoading: {
              ...state.lazyLoading,
              offset: 0,
              sortDate: 'desc',
              sortPrice: 'desc'
            },
          };
        }
        case '1': {
          return {
            ...state,
            listAsks: [],
            lazyLoading: {
              ...state.lazyLoading,
              offset: 0,
              sortDate: 'asc'
            },
          };
        }
        case '2': {
          return {
            ...state,
            listAsks: [],
            lazyLoading: {
              ...state.lazyLoading,
              offset: 0,
              sortDate: 'desc'
            },
          };
        }
        case '3': {
          return {
            ...state,
            listAsks: [],
            lazyLoading: {
              ...state.lazyLoading,
              offset: 0,
              sortPrice: 'asc'
            },
          };
        }
        case '4': {
          return {
            ...state,
            listAsks: [],
            lazyLoading: {
              ...state.lazyLoading,
              offset: 0,
              sortPrice: 'desc'
            },
          };
        }
      }
    }
    //search
    case types.SET_KEYWORD_SEARCH: {
      return {
        ...state,
        lazyLoading: {
          ...state.lazyLoading,
          offset: 0,
          keyword: action.keyword
        }
      };
    }
    case types.GET_TOP_SEARCH: {
      return {
        ...state,
        listAsks: [],
        lazyLoading: {
          ...state.lazyLoading,
          offset: 0,
          isFetched: false,
        }
      };
    }

    default:
      return state;
  }
};

export default reducer;
