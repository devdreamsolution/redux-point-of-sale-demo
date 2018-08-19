import * as s from '../services/StockServices'
import axios from 'axios'
import * as t from './types'

export const retrieveStocks = (str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.retrieveStocksService(str));
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_STOCKS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_STOCKS_FAILURE
            })
        }

    }
}
export const retrieveStockByBarcode = (str) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.retrieveStockByBarcodeService(str));
      if (response.status === 200) {
        dispatch({
          type: t.RETRIEVE_STOCK_BY_BARCODE_SUCCESS,
          payload: response.data
        })
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.RETRIEVE_STOCK_BY_BARCODE_FAILURE
      })
    }

  }
}
export const createStock = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createStockService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_STOCKS_SUCCESS,
                    payload: response.data
                });
                dispatch(retrieveStocks(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_STOCKS_FAILURE
            })
        }

    }
}

export const updateStock = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updateStockService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_STOCKS_SUCCESS
                });
                dispatch(retrieveStocks(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error);
            dispatch({
                type: t.EDIT_STOCKS_FAILURE
            })
        }

    }
}

export const deleteStock = (id,str) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.deleteStockService(id))
      if (response.status === 200) {
        dispatch({
          type: t.DELETE_STOCKS_SUCCESS
        });
        dispatch(retrieveStocks(str));
      } else {
        throw Error
      }
    }
    catch (error) {
      dispatch({
        type: t.DELETE_STOCKS_FAILURE
      })
    }

  }
}